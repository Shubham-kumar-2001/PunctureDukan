const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});
const ProviderSchema = new Schema({
  username: String,
  shopname: String,
  servicename: String,
  image: String,
  address: String,
  price: Number,
  providerlocation: {
    type: pointSchema,
    index: "2dsphere",
    required: true,
  },
  created: { type: Date, default: Date.now },
});

const ProviderService = mongoose.model("ProviderServices", ProviderSchema);
module.exports = ProviderService;
