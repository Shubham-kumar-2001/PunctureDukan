const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const polygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Polygon"],
    required: true,
  },
  coordinates: {
    type: [[[Number]]],
    required: true,
  },
});
const ProviderOrderSchema = new Schema({
  serviceName: String,
  image: String,
  location: {
    type: polygonSchema,
    required: true,
  },
  price: Number,
  otp: String,
  username: String,
  distance: Number,
  companyname: String,
  usermobilenumber: Number,
  status: String,
  created: { type: Date, default: Date.now },
});

const ProviderOrder = mongoose.model("ProviderOrders", ProviderOrderSchema);
module.exports = ProviderOrder;
