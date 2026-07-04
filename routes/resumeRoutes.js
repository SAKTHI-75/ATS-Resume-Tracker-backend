const express = require("express");
const router = express.Router();
const multer = require("multer");

const extractText = require("../utils/resumeParser");
const calculateATS = require("../utils/atsScore");

// Multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload Resume
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Extract resume text
    const resumeText = await extractText(req.file);

    // Required skills
    const requiredSkills = [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JavaScript",
      "HTML", 
      "CSS",
      "Git",
      "REST API",
      "Redux",
      "JWT",
      "SQL",
      "Bootstrap"
    ];

    // Calculate ATS
    const result = calculateATS(resumeText, requiredSkills);

    console.log("========== ATS RESULT ==========");
    console.log(result);

    console.log("========== RESUME TEXT ==========");
    console.log(resumeText);

    const response = {
      success: true,
      resumeText: resumeText,
      score: result.score,
      matchedSkills: result.matched,
      missingSkills: result.missing,
      recommendation: result.recommendation,
    };

    console.log("========== RESPONSE ==========");
    console.log(response);

    return res.json(response);

  } catch (err) {
    console.error("Resume Route Error:", err);

    return res.status(500).json({
      success: false,
      message: "Resume parsing failed",
    });
  }
});

module.exports = router;