const Razorpay = require("razorpay");
const crypto = require("crypto");
console.log(process.env.RAZOR_PAY_SECRET_KEY, process.env.RAZOR_PAY_ID);

module.exports.PaymentsOrder = (req, res) => {
  try {
    console.log(req.body);
    const instance = new Razorpay({
      key_id: process.env.RAZOR_PAY_ID,
      key_secret: process.env.RAZOR_PAY_SECRET_KEY,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "Something Went Wrong!" });
      }
      res.status(200).json({
        success: true,
        data: order,
        message: "Request send successfully",
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
    console.log(error);
  }
};

module.exports.VerifyPayments = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    console.log(req.body);
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZOR_PAY_SECRET_KEY)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res
        .status(200)
        .json({ success: true, message: "Payment verified successfully" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
    console.log(error);
  }
};
