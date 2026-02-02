const express = require("express");
const User = require("../models/user");
const auth = require("../Middleware/auth");

const router = express.Router();

// Get user health scores
router.get("/scores", auth, async (req, res) => {
  const userId = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ scores: user.scores });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;

