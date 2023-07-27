const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  // console.log(req.cookies.userjwt);
  try {
    const token = req.cookies.userjwt;

    if (!token) {
      return res(401).json({ success: false, message: "Invalid User" });
    }
    const decodeToken = await jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decodeToken;
    next();
  } catch (err) {
    console.log(err.message, process.env.TOKEN_KEY);
    res.status(401).json({
      success: false,
      message: "Authentication Error" + err.message,
    });
  }
};
