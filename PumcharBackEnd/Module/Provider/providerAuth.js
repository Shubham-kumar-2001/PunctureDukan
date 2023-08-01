const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const providerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email can not be blank"],
    unique: [true, "Already exits"],
  },
  mobilenumber: {
    type: Number,
    required: true,
    unique: [true, "Already exits"],
  },
  password: {
    type: String,
  },
  firstname: { type: String, required: [true, "FirstName can not be blank"] },
  lastname: { type: String, required: [true, "LastName can not be blank"] },
  avatar: { type: String },
  gender: String,
  profile: { type: String },
  created: { type: Date, default: Date.now },
});
providerSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});
const ProviderAuth = mongoose.model("ProviderAuth", providerSchema);
module.exports = ProviderAuth;
