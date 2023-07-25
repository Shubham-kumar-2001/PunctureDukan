const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ServicesSchema = new Schema({
  name: String,
  image: String,
  aboutServices: String,
  price: Number,
});

const Services = mongoose.model("Servicess", ServicesSchema);
module.exports = Services;
