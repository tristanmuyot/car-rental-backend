require("dotenv").config();
const express = require("express");
const carsRoutes = require("./routes/cars");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
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

// Routes
app.use(`${API_PREFIX}/cars`, carsRoutes);
app.use(`${API_PREFIX}/users`, usersRoutes);
app.use(`${API_PREFIX}/auth`, authRoutes);

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `All set! Connected to DB and listening to port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("Error connecting database. ", err);
  });
