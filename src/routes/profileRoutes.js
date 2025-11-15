const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

const router = express.Router();

// Set up storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '_' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/:id', upload.array('photos', 5), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    // ✅ Save proper array (not string)
    const uploadedPaths = req.files.map(file => '/uploads/' + file.filename);

    // Merge old + new photos if already present
    const existingPhotos = Array.isArray(user.photos) ? user.photos : [];
    const allPhotos = [...existingPhotos, ...uploadedPaths].slice(0, 5); // max 5

    user.photos = allPhotos;
    user.isProfileComplete = true;
    await user.save();

    res.json({
      message: 'Profile updated successfully',
      photos: allPhotos
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// ******************************************
// PROFILE PICTURE UPLOAD
// ******************************************
router.post('/profile/:id', upload.single('profile'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = '/uploads/' + req.file.filename;

    user.profilePicture = filePath;
    await user.save();

    res.json({
      message: 'Profile picture updated successfully',
      profilePicture: filePath
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
