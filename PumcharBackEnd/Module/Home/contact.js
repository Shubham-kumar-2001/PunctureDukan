const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContactUsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email can not be blank"],
  },
  mobilenumber: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const ContactUs = mongoose.model("ContactUs", ContactUsSchema);
module.exports = ContactUs;
