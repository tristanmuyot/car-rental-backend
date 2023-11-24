const express = require("express");
const {
  createCar,
  getAllCars,
  getCar,
  deleteCar,
  updateCar,
  getCarByOwnerId,
} = require("../controllers/car.controller");

const router = express.Router();

// Get All Cars
router.get("/", getAllCars);

// Get car by mdb ID
router.get("/:id", getCar);

// Get cars owned by user id
router.get("/owned/:userId", getCarByOwnerId);

// Create new car
router.post("/", createCar);

// Delete car
router.delete("/:id", deleteCar);

// Update car
router.patch("/:id", updateCar);

module.exports = router;
