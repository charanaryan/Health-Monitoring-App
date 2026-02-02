const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const OTP = require("../models/OTP");

const router = express.Router();

// Ensure environment variables are loaded
require("dotenv").config();

// Debug: prove env vars are loaded (temporary)
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS =", process.env.EMAIL_PASS ? '[present]' : process.env.EMAIL_PASS);

// Create the Nodemailer transporter (use explicit host/port for clarity)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true,
  logger: true,
});

// Verify transporter credentials at startup (helpful to fail fast)
transporter.verify()
  .then(() => console.log("SMTP ready"))
  .catch((err) => console.error("SMTP verify failed:", err.message || err));

// Send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

    // Validate email credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS in environment");
      return res.status(500).json({ message: "Mail credentials not configured" });
    }

    // Save the OTP to the database (expiresAt used for TTL)
    await OTP.create({ email, otp, expiresAt: new Date(otpExpiry) });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP for Password Reset",
      text: `Your OTP for password reset is: ${otp}. This OTP is valid for 5 minutes.`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending OTP", error: error.message || error });
      }

      console.log("OTP email sent:", info.response);
      res.status(200).json({ message: "OTP sent successfully" });
    });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    // Find the OTP record in the database
    const otpRecord = await OTP.findOne({ email, otp });

    // Check if the OTP exists and is valid
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP has expired
    if (Date.now() > otpRecord.expiresAt) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // If OTP is valid, remove it from the database to prevent reuse
    await OTP.deleteOne({ email, otp });

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;

