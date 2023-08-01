const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.providerjwt;
    if (!token) {
      return res(401).json({ success: false, message: "Invalid User" });
    }
    const decodeToken = await jwt.verify(token, process.env.PROVIDER_KEY);
    req.provider = decodeToken;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({
      success: false,
      message: "Authentication Error" + err.message,
    });
  }
};
