const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carsSchema = new Schema(
  {
    name: String,
    brand: String,
    year_model: String,
    transmission: String,
    description: String,
    pickup_location: String,
    is_booked: Boolean,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    city: String,
    status: String,
    image_url: String,
    rate: {
      price_formatted: String,
      price_raw: Number,
      price_currency: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carsSchema);
