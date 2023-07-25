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
const OrderServiceSchema = new Schema({
  userusername: String,
  providerusername: String,
  userfirstname: String,
  userlastname: String,
  providerfirstname: String,
  providerlastname: String,
  servicename: String,
  image: String,
  usermobilenumber: Number,
  providermobilenumber: Number,
  price: Number,
  shopname: String,
  location: {
    type: polygonSchema,
    required: true,
  },
  otp: String,
  status: String,
  distance: Number,
  created: { type: Date, default: Date.now },
});

const OrderService = mongoose.model("OrderServices", OrderServiceSchema);
module.exports = OrderService;
