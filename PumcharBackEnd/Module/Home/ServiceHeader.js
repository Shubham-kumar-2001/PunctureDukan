const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ServiceNavSchema = new Schema({
  name: String,
  fabIcon: String,
  list: [{ name: String, fabIcon: String }],
});

const ServiceNav = mongoose.model("ServiceNavs", ServiceNavSchema);
module.exports = ServiceNav;
