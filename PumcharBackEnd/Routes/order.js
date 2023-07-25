const express = require("express");
const router = express.Router();
const Authmiddleware = require("../Middleware/Authmiddleware");
const {
  fetchingNearServiceProviderLocation,
  acceptOrder,
  fetchRequestForService,
  onReject,
} = require("../controller/OrderController");
const ProviderAuthMiddleWare = require("../Middleware/ProviderAuthMiddleWare");
router
  .route("/orderdetail")
  .post(Authmiddleware, fetchingNearServiceProviderLocation);
router.route("/acceptorder").post(ProviderAuthMiddleWare, acceptOrder);
router
  .route("/providerorderdetail")
  .get(ProviderAuthMiddleWare, fetchRequestForService);
router.route("/onrejectorder").put(ProviderAuthMiddleWare, onReject);
module.exports = router;
