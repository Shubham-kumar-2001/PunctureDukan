const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
  body: String,
  rating: Number,
  name: String,
  userType: String,
  image: String,
});

const Review = mongoose.model("Reviews", ReviewSchema);
module.exports = Review;
