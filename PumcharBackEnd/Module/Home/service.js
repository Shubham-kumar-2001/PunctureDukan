const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ServiceSchema = new Schema({
  name: String,
  price: Number,
  aboutServices: String,
});

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;
