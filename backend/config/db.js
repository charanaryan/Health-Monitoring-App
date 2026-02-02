const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("No MongoDB connection string provided in MONGO_URI or MONGODB_URI");
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.log("Retrying in 5 seconds...");
    setTimeout(() => connectDB(), 5000);
  }
};

module.exports = connectDB;