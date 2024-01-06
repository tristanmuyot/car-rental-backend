const { default: mongoose } = require("mongoose");
const UserModel = require("../models/user.model");
const BookingModel = require("../models/booking.model");

async function getBookings(req, res) {
  const bookings = await BookingModel.find();

  res.status(200).json({ data: bookings });
}

async function getBooking(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Booking not found" });
  }

  const booking = await BookingModel.findById({
    _id: id,
  })
    .populate("user")
    .populate("car");

  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }

  res.status(200).json({ data: booking });
}
async function deleteBookings(req, res) {
  await BookingModel.deleteMany({});

  res.status(200).json({ data: "success" });
}

async function getBookingByUserId(req, res) {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "Booking not found" });
  }

  const booking = await BookingModel.find({
    user: userId,
  })
    .populate("user")
    .populate("car");

  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }

  res.status(200).json({ data: booking });
}

async function createBookings(req, res) {
  const { user, car, pick_up_date, return_date, number_of_days, total_amount } =
    req.body;

  try {
    const booking = await BookingModel.create({
      user,
      car,
      pick_up_date,
      return_date,
      number_of_days,
      total_amount,
    });

    res.status(200).json({ data: booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User not found" });
  }

  const user = await UserModel.findOneAndUpdate(
    {
      _id: id,
    },
    { ...req.body }
  );

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ data: user });
}

async function deleteBooking(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No booking found" });
  }

  const booking = await BookingModel.findOneAndDelete({ _id: id });

  if (!booking) {
    return res.status(404).json({ error: "No booking found" });
  }

  res.status(200).json({ data: "success" });
}

module.exports = {
  getBookingByUserId,
  getBooking,
  getBookings,
  deleteBooking,
  createBookings,
  updateUser,
  deleteBookings,
};
