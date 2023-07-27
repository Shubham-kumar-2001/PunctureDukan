const express = require("express");
const ProviderAuthMiddleWare = require("../Middleware/ProviderAuthMiddleWare");
const { PaymentsOrder, VerifyPayments } = require("../controller/Payments");
const router = express.Router();

router.route("/paymentsorder").post(ProviderAuthMiddleWare, PaymentsOrder);
router.route("/verifypayments").post(ProviderAuthMiddleWare, VerifyPayments);
module.exports = router;
