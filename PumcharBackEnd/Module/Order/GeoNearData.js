const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GeoNearSchema = new Schema({
  Geonear: {},
  userdata: {},
});
const GeoNear = mongoose.model("GeoNears", GeoNearSchema);
module.exports = GeoNear;
