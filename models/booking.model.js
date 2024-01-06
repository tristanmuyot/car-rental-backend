const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pick_up_date: String,
    return_date: String,
    number_of_days: Number,
    total_amount: Number,
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
