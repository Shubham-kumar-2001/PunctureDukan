const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.userjwt;
    console.log(req.cookies.userjwt);
    if (!token) {
      return res(401).json({ success: false, message: "Invalid User" });
    }
    const decodeToken = await jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decodeToken;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(501).json({
      success: false,
      message: err.message,
    });
  }
};
