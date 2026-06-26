const dns = require("dns");
const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI?.trim();

  if (!uri) {
    console.error("❌ MONGO_URI is not defined. Add it to backend/.env.");
    process.exit(1);
  }

  const isAtlas = uri.startsWith("mongodb+srv://");
  if (isAtlas) {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    console.log("ℹ️ Using public DNS servers for Atlas SRV resolution");
  }

  try {
    await mongoose.connect(uri);
    console.log(`✅ MongoDB connected (${isAtlas ? "Atlas" : "local"})`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;