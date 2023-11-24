const CarModel = require("../models/car.model");
const UserModel = require("../models/user.model");
const { CAR_STATUSES } = require("../utils");
const mongoose = require("mongoose");
const formidable = require("formidable");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dcuwxefil",
  api_key: "924257435679797",
  api_secret: process.env.CLOUDINARY_SECRET,
});

async function getAllCars(req, res) {
  const cars = await CarModel.find({});

  res.status(200).json({ data: cars });
}

async function getCar(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No car found" });
  }

  const car = await CarModel.findById(id);

  if (!car) {
    return res.status(404).json({ error: "No car found" });
  }

  res.status(200).json({ data: car });
}

async function createCar(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async function (err, fields, files) {
    const details = JSON.parse(fields.details);

    cloudinary.uploader.upload(
      files.image.path,
      { public_id: `${details.owner} - ${details.name}` },
      async function (error, result) {
        if (!error) {
          try {
            const car = await CarModel.create({
              name: details.name,
              brand: details.brand,
              transmission: details.transmission,
              is_booked: false,
              owner: details.owner,
              location: details.location,
              status: CAR_STATUSES.WAITING_FOR_VISIT,
              image_url: result.url,
              rate: {
                price_formatted: `PHP ${details.price}/day`,
                price_raw: details.price,
                price_currency: "PHP",
              },
            });

            await UserModel.updateOne(
              { _id: details.owner },
              {
                $push: { cars_owned: car._id },
              }
            );

            res.status(200).json(car);
          } catch (err) {
            console.log(err);
            res.status(400).json({ error: err.message });
          }
        }
      }
    );
  });
}

async function deleteCar(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No car found" });
  }

  const car = await CarModel.findOneAndDelete({ _id: id });

  await UserModel.updateOne(
    { _id: car.owner },
    {
      $pull: { cars_owned: car._id },
    }
  );

  if (!car) {
    return res.status(404).json({ error: "No car found" });
  }

  res.status(200).json({ data: "success" });
}

async function updateCar(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No car found" });
  }

  const car = await CarModel.findOneAndUpdate(
    {
      _id: id,
    },
    { ...req.body }
  );

  if (!car) {
    return res.status(404).json({ error: "No car found" });
  }

  res.status(200).json({ data: car });
}

async function getCarByOwnerId(req, res) {
  const { userId } = req.params;

  const cars = await CarModel.find({ owner: userId }).populate("owner");

  res.status(200).json({ data: cars });
}

module.exports = {
  createCar,
  getAllCars,
  getCar,
  deleteCar,
  updateCar,
  getCarByOwnerId,
};
