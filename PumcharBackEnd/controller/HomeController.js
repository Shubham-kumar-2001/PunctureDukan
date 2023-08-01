const Services = require("../Module/Home/services");
const Review = require("../Module/Home/review");
const WhenEver = require("../Module/Home/whenEver");
const WhatInIt = require("../Module/Home/whatInIt");
const ContactUs = require("../Module/Home/contact");
const About = require("../Module/Home/About");
const ServiceNav = require("../Module/Home/ServiceHeader");

module.exports.CarouselPage = async (req, res) => {
  try {
    const Caro = await Services.find({});
    res.status(200).json({ success: true, Caro });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.ServicePages = async (req, res) => {
  try {
    const service = await Services.find({});
    res.status(200).json({ success: true, service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.WhenEverAndWhereEver = async (req, res) => {
  try {
    const whenEver = await WhenEver.find({});
    res.status(200).json({ success: true, whenEver });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.Review = async (req, res) => {
  try {
    const revi = await Review.find({});
    res.status(200).json({ success: true, revi });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
module.exports.WhatInIt = async (req, res) => {
  try {
    const whatinit = await WhatInIt.find({});
    res.status(200).json({ success: true, whatinit });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
module.exports.service = async (req, res) => {
  try {
    const { service_id } = req.params;
    const service = await Services.findById(service_id);
    res.status(201).json({ success: true, service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.Contactus = async (req, res) => {
  try {
    const { name, mobilenumber, email, message } = req.body;
    await ContactUs.create({ name, mobilenumber, email, message });
    res
      .status(201)
      .json({ success: true, message: "Our customer care conatct you soon" });
  } catch (err) {
    res
      .status(201)
      .json({ success: false, message: "Plz enter your Query again!!!!" });
  }
};
module.exports.About = async (req, res) => {
  try {
    const about = await About.find({});
    res.status(200).json({ success: true, about });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
module.exports.Headernav = async (req, res) => {
  try {
    const headerNav = await ServiceNav.find({});
    res.status(201).json({ success: true, headerNav });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
