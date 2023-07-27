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
const UserOrderSchema = new Schema({
  username: String,
  otp: String,
  serviceName: String,
  image: String,
  providerlocation: {
    type: pointSchema,
    required: true,
  },
  price: Number,
  serviceprovidername: String,
  distance: String,
  shopname: String,
  status: String,
  order_id: String,
  providermobilenumber: Number,
  created: { type: Date, default: Date.now },
});

const UserOrder = mongoose.model("UserOrders", UserOrderSchema);
module.exports = UserOrder;
