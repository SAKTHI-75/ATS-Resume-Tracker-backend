const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: String,
  score: Number,
  status: String
});

module.exports = mongoose.model(
  "Candidate",
  CandidateSchema
);