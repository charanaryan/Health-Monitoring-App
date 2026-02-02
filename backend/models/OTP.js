const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  // explicit expiry time used by the app and also by MongoDB TTL index
  expiresAt: { type: Date, required: true },
});

// TTL index so documents are removed after `expiresAt`
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
// nhwq nbwp mhxm auqe