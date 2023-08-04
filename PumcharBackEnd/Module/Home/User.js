const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserNavSchema = new Schema({
  name: String,
  fabIcon: String,
  list: [{ name: String, fabIcon: String }],
});

const UserNav = mongoose.model("UserNavs", UserNavSchema);
module.exports = UserNav;
