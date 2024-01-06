require("dotenv").config();
const express = require("express");
const carsRoutes = require("./routes/cars");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/booking");
const mongoose = require("mongoose");

var cors = require("cors");

const app = express();
const API_PREFIX = "/api";

// Middleware (runs before every request reach the code)
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get(`${API_PREFIX}/`, (req, res) => {
  res.json({ data: "Hello world" });
});

// Routes
app.use(`${API_PREFIX}/cars`, carsRoutes);
app.use(`${API_PREFIX}/users`, usersRoutes);
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/booking`, bookingRoutes);

// DB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`All set! Connected to DB`);
  })
  .catch((err) => {
    console.log("Error connecting database. ", err);
  });

module.exports = app;
