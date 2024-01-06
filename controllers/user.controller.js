const { default: mongoose } = require("mongoose");
const UserModel = require("../models/user.model");

async function getUsers(req, res) {
  const users = await UserModel.find();

  res.status(200).json({ data: users });
}

async function getUser(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User not found" });
  }

  const user = await UserModel.findById({
    _id: id,
  }).populate("cars_owned");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ data: user });
}

async function createUser(req, res) {
  const { full_name, email_address, username, password, role, contact_number } =
    req.body;

  try {
    const user = await UserModel.create({
      full_name,
      email_address,
      username,
      password,
      role,
      contact_number,
    });

    res.status(200).json({ data: user });
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

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
};
