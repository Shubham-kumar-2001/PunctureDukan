const express = require("express");
const router = express.Router();
const {
  CarouselPage,
  ServicePages,
  Review,
  WhenEverAndWhereEver,
  WhatInIt,
  service,
  Contactus,
  About,
  Headernav,
} = require("../controller/HomeController");
const Authmiddleware = require("../Middleware/Authmiddleware");
router.route("/contact").post(Contactus);
router.route("/services").get(ServicePages);
router.route("/review").get(Review);
router.route("/about").get(About);
router.route("/whenever&whereever").get(WhenEverAndWhereEver);
router.route("/whatinit").get(WhatInIt);
router.route("/navdata").get(Headernav);
router.route("/service/:service_id").get(Authmiddleware, service);

module.exports = router;
