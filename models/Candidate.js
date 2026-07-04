const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({

    name: String,

    email: String,

    phone: String,

    role: String,

    score: Number,

    status: {
        type: String,
        default: "Applied"
    },

    matchedSkills: [String],

    missingSkills: [String],

    recommendation: String,

    resumeFile: String,

    resumeText: String

},
{
    timestamps:true
});

module.exports = mongoose.model("Candidate", CandidateSchema);