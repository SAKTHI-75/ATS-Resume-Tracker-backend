const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
require("dotenv").config();

const app = express();

// ── Middleware ─────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ─────────────────────────────────────────────
app.use("/api/candidates", require("./routes/candidateRoutes"));
app.use("/api/jobs",       require("./routes/jobRoutes"));
app.use("/api/resumes",    require("./routes/resumeRoutes"));

// ── Health check ───────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "ATS Backend running ✅" });
});

// ── Connect DB then start server ───────────────────────
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Server startup failed:", err);
    process.exit(1);
  });