const express = require("express");
const {
  Register,
  Login,
  getUserData,
  updateUser,
  OTPLoginGenerator,
  OTPGenerator,
  verifyOTP,
  verifyLoginOTP,
  resetPassword,
  logout,
} = require("../controller/userController");
const Authmiddleware = require("../Middleware/Authmiddleware");
const { fetchUserOrderDetail } = require("../controller/OrderController");
const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/generateloginotp").post(OTPLoginGenerator);
router.route("/verifyloginotp").post(verifyLoginOTP);
router.route("/generateotp").post(OTPGenerator);
router.route("/verifyotp").post(verifyOTP);

// /** GET Methods */
router.route("/userorderdetail").get(Authmiddleware, fetchUserOrderDetail);
router.route("/user").get(Authmiddleware, getUserData);
router.route("/logout").get(Authmiddleware, logout);
router.route("/authenticate").get(Authmiddleware, (req, res) => {
  res.status(201).json({ success: true });
});
// put methos
router.route("/updateuser").put(Authmiddleware, updateUser);
router.route("/resetpassword").put(Authmiddleware, resetPassword);
module.exports = router;
