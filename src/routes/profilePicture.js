const express = require("express");
const multer = require("multer");
const User = require("../models/User");

const router = express.Router();

// Storage Settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

// ROUTE :: Upload Profile Picture
router.post("/:id", upload.single("profile"), async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!req.file)
      return res.status(400).json({ error: "No file uploaded" });

    const filePath = "/uploads/" + req.file.filename;

    user.profilePicture = filePath;
    await user.save();

    res.json({
      success: true,
      message: "Profile picture uploaded successfully",
      profilePicture: filePath,
    });
  } catch (err) {
    console.error("Error uploading DP:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
