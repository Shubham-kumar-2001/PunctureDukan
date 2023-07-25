const Carousel = require("../Module/Home/coursel");
const Services = require("../Module/Home/services");
const Review = require("../Module/Home/review");
const WhenEver = require("../Module/Home/whenEver");
const WhatInIt = require("../Module/Home/whatInIt");

module.exports.CarouselPage = async (req, res) => {
  const Caro = await Carousel.find({});
  res.json(Caro);
};

module.exports.ServicePages = async (req, res) => {
  const service = await Services.find({});
  res.json(service);
};

module.exports.WhenEverAndWhereEver = async (req, res) => {
  const whenEver = await WhenEver.find({});
  res.json(whenEver);
};

module.exports.Review = async (req, res) => {
  const revi = await Review.find({});
  res.json(revi);
};
module.exports.WhatInIt = async (req, res) => {
  const whatinit = await WhatInIt.find({});
  res.json(whatinit);
};
module.exports.service = async (req, res) => {
  const { service_id } = req.params;
  const service = await Services.findById(service_id);
  res.status(201).json(service);
};
