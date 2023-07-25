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
const { fetchProviderOrderDetail } = require("../controller/OrderController");
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
// put methos
router.route("/updateuser").put(ProviderAuthMiddleWare, updateUser);

module.exports = router;
