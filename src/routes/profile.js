const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      id: user.id,
      name: user.displayName,
      age: user.age,
      location: user.location,
      about: user.about,
      hobbies: user.hobbies,
      gender: user.gender,
      photos: user.photos || [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
