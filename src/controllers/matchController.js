const { Op } = require("sequelize");
const User = require("../models/User");

exports.getMatches = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("🧠 Current User:");
    console.log({
      id: user.id,
      username: user.username,
      gender: user.gender,
      interestedIn: user.interestedIn
    });

    // Parse `interestedIn` if it's a string
    let interestedInArray = [];
    if (typeof user.interestedIn === "string") {
      try {
        interestedInArray = JSON.parse(user.interestedIn);
      } catch (e) {
        interestedInArray = [user.interestedIn];
      }
    } else {
      interestedInArray = user.interestedIn || [];
    }

    console.log("🎯 Interested in (parsed):", interestedInArray);

    // Find potential matches
    const matches = await User.findAll({
      where: {
        id: { [Op.ne]: user.id },
        gender: { [Op.in]: interestedInArray },
        interestedIn: {
          [Op.like]: `%${user.gender}%`
        }
      },
      attributes: ["id", "username", "gender", "sexualOrientation", "interestedIn"]
    });

    console.log(`✅ Found ${matches.length} match(es)`);
    if (matches.length > 0) {
      matches.forEach(m => {
        console.log(`   👉 ${m.username} (${m.gender})`);
      });
    }

    res.json(matches);
  } catch (error) {
    console.error("❌ Match Error:", error);
    res.status(500).json({ message: "Error fetching matches", error: error.message });
  }
};
