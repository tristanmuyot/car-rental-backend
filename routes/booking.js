const express = require("express");
const {
  createBookings,
  deleteBooking,
  getBookings,
  getBooking,
  getBookingByUserId,
  // deleteBookings,
} = require("../controllers/booking.controller");
const router = express.Router();

router.get("/", getBookings);

router.get("/:id", getBooking);

router.get("/owned/:userId", getBookingByUserId);

router.post("/", createBookings);

router.delete("/:id", deleteBooking);
// router.delete("/deleteall", deleteBookings);

module.exports = router;
