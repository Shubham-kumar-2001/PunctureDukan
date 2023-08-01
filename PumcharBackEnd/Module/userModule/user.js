const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
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
  profile: { type: String },
  gender: String,
  created: { type: Date, default: Date.now },
});
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
