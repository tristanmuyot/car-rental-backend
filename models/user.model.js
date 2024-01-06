const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    full_name: String,
    email_address: String,
    username: String,
    password: String,
    contact_number: String,
    role: {
      type: String,
      default: "default",
    },

    cars_owned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
