const express = require("express");
const User = require("../models/user");
const auth = require("../Middleware/auth");

const router = express.Router();

// Function to calculate overall score
const calculateOverallScore = (scores) => {
  const { physicalFitness, nutrition, mentalWellBeing, lifestyle, biomarkers } = scores;
  return Math.round((physicalFitness + nutrition + mentalWellBeing + lifestyle + biomarkers) / 5);
};

// Save assessment score
router.post("/save-score", auth, async (req, res) => {
  const { category, score } = req.body;
  const userId = req.user; // Extract user ID from the authenticated request

  try {
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the score for the given category
    user.scores[category] = score;

    // Calculate overall score
    user.scores.overallScore = calculateOverallScore(user.scores);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Score saved successfully", overallScore: user.scores.overallScore });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
