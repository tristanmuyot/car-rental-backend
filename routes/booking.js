const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  res.json({ data: "Get users" });
});

module.exports = router;
