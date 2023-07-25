const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WhenEverSchema = new Schema({
  image: String,
  title: String,
  subTitle: String,
});

const WhenEver = mongoose.model("WhenEver", WhenEverSchema);
module.exports = WhenEver;
