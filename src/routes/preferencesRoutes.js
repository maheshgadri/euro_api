const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Update user preferences
router.post('/set/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const {
      minAge,
      maxAge,
      lookingFor,
      relationshipType,
      hasChildren,
      smoking,
      alcohol,
      diet
    } = req.body;

    user.preferences = {
      ...user.preferences,
      minAge,
      maxAge,
      lookingFor,
      relationshipType,
      hasChildren,
      smoking,
      alcohol,
      diet
    };

    await user.save();

    res.json({ message: 'Preferences updated successfully', preferences: user.preferences });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// ✅ Get user preferences
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ preferences: user.preferences });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
