const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  scores: {
    physicalFitness: { type: Number, default: 0 },
    nutrition: { type: Number, default: 0 },
    mentalWellBeing: { type: Number, default: 0 },
    lifestyle: { type: Number, default: 0 },
    biomarkers: { type: Number, default: 0 },
    overallScore: { type: Number, default: 0 }
  },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;


