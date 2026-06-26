const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    skillsRequired: [String],
    openings: Number,
    status: {
      type: String,
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", JobSchema);