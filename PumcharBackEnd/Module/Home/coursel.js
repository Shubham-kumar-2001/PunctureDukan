const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CarouselSchema = new Schema({
  image: String,
});

const Carousel = mongoose.model("Carousel", CarouselSchema);
module.exports = Carousel;
