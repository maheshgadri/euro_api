// const User = require('../models/User');

// const getMe = async (req, res) => {
//   res.json({ user: req.user });
// };

// const updateProfile = async (req, res) => {
//   try {
//     const updates = req.body;
//     delete updates.passwordHash;
//     delete updates.email;

//     await req.user.update(updates);
//     res.json({ user: req.user });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { getMe, updateProfile };


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

// ✅ New: Update Preferences
const updatePreferences = async (req, res) => {
  try {
    const user = req.user;
    let { preferences } = req.body;

    // Ensure preferences is parsed correctly
    if (typeof preferences === 'string') {
      preferences = JSON.parse(preferences);
    }

    // Validate some expected fields (optional)
    const allowedKeys = [
      'minAge',
      'maxAge',
      'lookingFor',
      'relationshipType',
      'hasChildren',
      'smoking',
      'alcohol',
      'diet'
    ];

    // Filter invalid fields if needed
    const validPrefs = {};
    for (const key of allowedKeys) {
      if (preferences[key] !== undefined) validPrefs[key] = preferences[key];
    }

    user.preferences = validPrefs;
    await user.save();

    res.json({
      message: 'Preferences updated successfully',
      preferences: user.preferences,
    });
  } catch (err) {
    console.error('Preference update error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getMe, updateProfile, updatePreferences };

