const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
} = require("../controllers/user.controller");

const router = express.Router();

// Get all users
router.get("/", getUsers);

// Get user by id
router.get("/:id", getUser);

// Create user
router.post("/", createUser);

// Update user
router.patch("/:id", updateUser);

module.exports = router;
