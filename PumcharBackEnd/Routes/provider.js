const express = require("express");
const router = express.Router();
const Authmiddleware = require("../Middleware/Authmiddleware");
const {
  OTPLoginGenerator,
  Register,
  Login,
  verifyLoginOTP,
  OTPGenerator,
  verifyOTP,
  getUserData,
  logout,
  updateUser,
  serviceProvidedByProvider,
} = require("../controller/providerController");
const ProviderAuthMiddleWare = require("../Middleware/ProviderAuthMiddleWare");
const { ServiceProvided } = require("../controller/OrderController");
// const { fetchProviderOrderDetail } = require("../controller/OrderController");
// const { RegisterMail } = require("../GenratorOTP/OTPMailer");
// const { sendMessage } = require("../GenratorOTP/mobileOTP");
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/generateloginotp").post(OTPLoginGenerator);
router.route("/verifyloginotp").post(verifyLoginOTP);
router.route("/generateotp").post(OTPGenerator);
router.route("/verifyotp").post(verifyOTP);
router
  .route("/addservice")
  .post(ProviderAuthMiddleWare, serviceProvidedByProvider);

// /** GET Methods */
// router
//   .route("/providerorderdetail")
//   .get(ProviderAuthMiddleWare, fetchProviderOrderDetail);
router.route("/user").get(ProviderAuthMiddleWare, getUserData);
router.route("/logout").get(ProviderAuthMiddleWare, logout);
router.route("/authenticate").get(ProviderAuthMiddleWare, (req, res) => {
  res.status(201).json({ success: true });
});
router.route("/serviceprovided").get(Authmiddleware, ServiceProvided);
// put methos
router.route("/updateuser").put(ProviderAuthMiddleWare, updateUser);

module.exports = router;
