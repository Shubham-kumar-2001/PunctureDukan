const Razorpay = require("razorpay");
const crypto = require("crypto");
// console.log(process.env.RAZOR_PAY_SECRET_KEY, process.env.RAZOR_PAY_ID);

module.exports.PaymentsOrder = async (req, res) => {
  try {
    // console.log(req.body);
    const instance = new Razorpay({
      key_id: process.env.RAZOR_PAY_ID,
      key_secret: process.env.RAZOR_PAY_SECRET_KEY,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    try {
      const response = await instance.orders.create(options);
      if (!response) {
        return res
          .status(500)
          .json({ success: false, message: "Something Went Wrong!" });
      }
      res.status(200).json({
        success: true,
        data: response,
        message: "Request send successfully",
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Something Went Wrong!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
    console.log(error);
  }
};

module.exports.VerifyPayments = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    console.log(
      { razorpay_order_id, razorpay_payment_id, razorpay_signature },
      "hi"
    );
    const shasum = crypto.createHmac(
      "sha256",
      process.env.RAZOR_PAY_SECRET_KEY
    );
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");
    if (digest !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Transaction Failed!!!" });
    }

    return res.status(200).json({
      success: true,
      orderId: razorpay_order_id,
      paymentsId: razorpay_payment_id,
      message: "Payment verified successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
    console.log(error);
  }
};
