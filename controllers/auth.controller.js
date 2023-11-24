const UserModel = require("../models/user.model");

async function login(req, res) {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  if (password !== user.password) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  res.status(200).json({ data: user });
}

module.exports = {
  login,
};
