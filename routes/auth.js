const express = require("express");
const { login } = require("../controllers/auth.controller");

const router = express.Router();

// login user
router.post("/login", login);

module.exports = router;
