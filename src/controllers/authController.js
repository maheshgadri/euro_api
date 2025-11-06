const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
  try {
    const { email, username, password, displayName, dob, gender, sexualOrientation, pronouns, interestedIn } = req.body;

    const existingEmail = await User.findOne({ where: { email } });
    const existingUsername = await User.findOne({ where: { username } });
    if (existingEmail) return res.status(400).json({ message: 'Email already in use' });
    if (existingUsername) return res.status(400).json({ message: 'Username already in use' });

    const saltRounds = parseInt(process.env.SALT_ROUNDS || '12', 10);
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      email, username, passwordHash, displayName, dob, gender, sexualOrientation, pronouns, interestedIn
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return res.status(201).json({ token, user: { id: user.id, email: user.email, username: user.username } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


const { OAuth2Client } = require('google-auth-library');
const client = require('../config/googleClient');

const googleSignin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'Google token required' });

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    // Find or create user
    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({
        email,
        username: name?.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000),
        displayName: name,
        googleId,
        passwordHash: null,
      });
    }

    // Issue JWT
    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.json({
      token: jwtToken,
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (err) {
    console.error('❌ Google Sign-in Error:', err);
    res.status(500).json({ message: 'Google sign-in failed', error: err.message });
  }
};

module.exports = { signup, login, googleSignin };

