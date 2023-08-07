const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FooterSchema = new Schema({
  title: String,
  subtitle: String,
  address: String,
  link: String,
  links: [{ name: String, fabIcon: String }],
});

const Footer = mongoose.model("Footers", FooterSchema);
module.exports = Footer;
