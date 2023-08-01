const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AboutSchema = new Schema({
  title: String,
  image: String,
  description: String,
  belive: String,
});

const About = mongoose.model("Abouts", AboutSchema);
module.exports = About;
