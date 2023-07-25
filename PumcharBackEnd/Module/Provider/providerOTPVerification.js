const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const providerOTPVerificationSchema = new Schema(
  {
    email: String,
    mobilenumber: Number,
    otp: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now, index: { expires: 15 * 60 } },
  },
  { timestamps: true }
);
providerOTPVerificationSchema.pre("save", async function () {
  this.otp = await bcrypt.hash(this.otp, 12);
});
const ProviderOTPVerification = mongoose.model(
  "providerOTPVerification",
  providerOTPVerificationSchema
);
module.exports = ProviderOTPVerification;
