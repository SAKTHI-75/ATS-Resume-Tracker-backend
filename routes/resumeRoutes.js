const express = require("express");
const router = express.Router();

router.post("/upload", (req, res) => {
  res.json({
    message: "Resume Uploaded Successfully"
  });
});

module.exports = router;