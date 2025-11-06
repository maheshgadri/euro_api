const User = require('../models/User');

const getMe = async (req, res) => {
  res.json({ user: req.user });
};

const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    delete updates.passwordHash;
    delete updates.email;

    await req.user.update(updates);
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getMe, updateProfile };
