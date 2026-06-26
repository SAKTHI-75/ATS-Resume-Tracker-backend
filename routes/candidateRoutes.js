const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "John Doe",
      role: "React Developer",
      score: 92,
      status: "Shortlisted"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Python Developer",
      score: 88,
      status: "Interview"
    }
  ]);
});

module.exports = router;