const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ServiceSchema = new Schema({
  servicename: String,
  price: Number,
  aboutServices: String,
  image: String,
  fabIcon: String,
});

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;
