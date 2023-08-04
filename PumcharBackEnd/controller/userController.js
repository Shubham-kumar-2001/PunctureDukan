const { createSecretToken } = require("../utility/JwtTokenGenerator");
const bcrypt = require("bcryptjs");
const otpGenerator = require("otp-generator");
const UserOTPVerification = require("../Module/userModule/userOTPVerification");
const User = require("../Module/userModule/user");
const { RegisterMail } = require("../GenratorOTP/OTPMailer");
const { sendMessage } = require("../GenratorOTP/mobileOTP");
module.exports.Register = async (req, res) => {
  try {
    const { email, password, mobilenumber, firstname, lastname } = req.body;
    const existingUser = await User.findOne({
      $or: [
        {
          email,
        },
        {
          mobilenumber,
        },
      ],
    });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }
    const username =
      firstname.trim().charAt(0).toUpperCase() +
      firstname.trim().slice(1).toLowerCase() +
      "_" +
      mobilenumber.trim().slice(5, 11);
    const user = await User.create({
      email,
      password,
      mobilenumber,
      firstname,
      lastname,
      username,
    });
    const token = createSecretToken(user.username);
    res.cookie("userjwt", token, {
      withCredentials: true,
      httpOnly: true,
      maxAge: 7 * 24 * 3600 * 1000,
      sameSite: "none",
      secure: true,
      expires: 1,
    });
    // req.session.usename = user.username;
    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      token,
    });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: error.message + " " + "user error" });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, mobilenumber, password } = req.body;
    if ((!email && !mobilenumber) || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    try {
      const user = await User.findOne({
        $or: [
          {
            email,
          },
          {
            mobilenumber,
          },
        ],
      });
      if (!user) {
        return res.json({
          success: false,
          message: "Incorrect password ",
        });
      }
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return res.json({
          success: false,
          message: "Incorrect password or email",
        });
      }
      const token = createSecretToken(user.username);
      res.cookie("userjwt", token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: 7 * 24 * 3600 * 1000,
        sameSite: "none",
        secure: true,
        expires: 1,
      });
      res.status(201).json({
        message: "User logged in successfully",
        success: true,
        token,
      });
    } catch (err) {
      res
        .status(401)
        .json({ message: "User Not Found!" + err.message, success: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something Else Went Wrong!" + err.message,
      success: false,
    });
  }
};
module.exports.OTPLoginGenerator = async (req, res) => {
  try {
    const { email, mobilenumber } = req.body;
    if (!email && !mobilenumber) {
      return res.json({ success: false, message: "All fields are required" });
    }
    try {
      const user = await User.findOne({
        $or: [
          {
            email,
          },
          {
            mobilenumber,
          },
        ],
      });
      if (!user) {
        return res.json({
          success: false,
          message: "Incorrect password or email",
        });
      }
      const otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const existingOTPUser = await UserOTPVerification.findOne({
        email,
        mobilenumber,
      });
      if (existingOTPUser) {
        const hashPassword = await bcrypt.hash(otp, 12);
        await UserOTPVerification.findOneAndUpdate(
          { email, mobilenumber },
          {
            otp: hashPassword,
          }
        );
      } else {
        await UserOTPVerification.create({
          email,
          mobilenumber,
          otp,
        });
      }
      if (email) {
        await RegisterMail({
          username: user.username,
          text: `Your account login code is ${otp}. Verify and login to your account and do not these code to anyone.`,
          subject: "Account Login OTP",
          userEmail: email,
        });
      } else {
        await sendMessage({
          mobilenumber: mobilenumber,
          message: `Mobile Number verification code is ${otp} Do not share it`,
        });
        // await client.messages.create({
        //   body: `Your account login code is ${otp}. Verify and login to your account and do not these code to anyone.`,
        //   to: `+91${mobilenumber}`,
        //   from: `${process.env.TWILIO_NUMBER}`,
        // });
      }
      res.status(201).json({
        success: true,
        message: `OTP Send successfuly to ${email || mobilenumber}`,
      });
    } catch (err) {
      res.json({ message: "User Not Found!" + err.message, success: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something Else Went Wrong!" + err.message,
      success: false,
    });
  }
};
module.exports.verifyLoginOTP = async (req, res) => {
  try {
    const { code, email, mobilenumber } = req.body;
    try {
      const user = await User.findOne({
        $or: [
          {
            email,
          },
          {
            mobilenumber,
          },
        ],
      });
      if (!user) {
        return res.json({
          success: false,
          message: "Incorrect password or email",
        });
      }
      const otpHolder = await UserOTPVerification.findOne({
        email,
        mobilenumber,
      });
      if (!otpHolder) {
        return res
          .status(401)
          .json({ success: false, message: "You have used Expired OTP" });
      }
      const validOTP = await bcrypt.compare(code, otpHolder.otp);
      if (!validOTP) {
        return res.json({ success: false, message: "Invalid OTP Code" });
      }
      if (
        (otpHolder.email === email ||
          otpHolder.mobilenumber === mobilenumber) &&
        validOTP
      ) {
        await UserOTPVerification.findByIdAndDelete(otpHolder._id);
      }
      const token = createSecretToken(user.username);
      res.cookie("userjwt", token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: 7 * 24 * 3600 * 1000,
        sameSite: "none",
        secure: true,
        expires: 1,
      });
      res.status(201).json({
        message: "User logged in successfully",
        success: true,
        token: token,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "User Not Found " + error.message });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something Else Went Wrong!" + err.message,
      success: false,
    });
  }
};
module.exports.OTPGenerator = async (req, res) => {
  try {
    const { email, mobilenumber } = req.body;
    if (!email && !mobilenumber) {
      return res.json({ success: false, message: "All fields are required" });
    }
    try {
      const user = await User.findOne({
        $or: [
          {
            email,
          },
          {
            mobilenumber,
          },
        ],
      });
      if (user) {
        return res.json({
          success: false,
          message: "Already Exist",
        });
      }
      const otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const existingOTPUser = await UserOTPVerification.findOne({
        email,
        mobilenumber,
      });
      if (existingOTPUser) {
        const hashPassword = await bcrypt.hash(otp, 12);
        await UserOTPVerification.findOneAndUpdate(
          { email, mobilenumber },
          {
            otp: hashPassword,
          }
        );
      } else {
        await UserOTPVerification.create({
          email,
          mobilenumber,
          otp,
        });
      }
      if (email) {
        await RegisterMail({
          text: `Email Verification code is ${otp}. Verify and login to your account.`,
          subject: "Verify your Email account",
          userEmail: email,
        });
      } else {
        await sendMessage({
          mobilenumber: mobilenumber,
          message: `Mobile Number verification code is ${otp} Do not share it`,
        });
        // await client.messages.create({
        //   body: `Your Mobile number verification code is ${otp}. Verify and login to your account.`,
        //   to: `+91${mobilenumber}`,
        //   from: `${process.env.TWILIO_NUMBER}`,
        // });
      }
      res.status(201).json({
        success: true,
        message: `OTP Send successfuly to ${email || mobilenumber}`,
      });
    } catch (err) {
      res.json({ message: "User Not Found!" + err.message, success: false });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something Else Went Wrong!" + err.message,
      success: false,
    });
  }
};
module.exports.verifyOTP = async (req, res) => {
  try {
    const { code, email, mobilenumber } = req.body;
    const otpHolder = await UserOTPVerification.findOne({
      email,
      mobilenumber,
    });
    if (!otpHolder) {
      return res
        .status(401)
        .json({ success: false, message: "You have used Expired OTP" });
    }
    const validOTP = await bcrypt.compare(code, otpHolder.otp);
    if (!validOTP) {
      return res.json({ success: false, message: "Invalid OTP Code" });
    }
    if (
      (otpHolder.email === email || otpHolder.mobilenumber === mobilenumber) &&
      validOTP
    ) {
      await UserOTPVerification.findByIdAndDelete(otpHolder._id);
    }
    res.status(201).json({
      message: "verify successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something Else Went Wrong!" + err.message,
      success: false,
    });
  }
};
module.exports.logout = async (req, res) => {
  try {
    const { username } = req.user;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      res.json({ success: false, message: "Invalid user" });
    }
    await res.clearCookie("userjwt", {
      path: "/",
    });
    res.status(201).json({ success: true, message: "Logout Successfully" });
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "Something Went Wrong" + err.message });
  }
};
module.exports.getUserData = async (req, res) => {
  try {
    const { username } = req.user;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(501)
        .json({ success: false, message: "Couldn't find the User" });
    }
    const { password, ...userData } = Object.assign({}, user.toJSON());
    return res.status(200).json({ success: true, userData });
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Can not find the User Data" });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { username } = req.user;
    const { mobilenumber, email, firstname, lastname, gender, avatar } =
      req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(501)
        .json({ success: false, message: "Couldn't find the User" });
    }
    const mobileNumber = await User.findOne({ mobilenumber });
    if (mobileNumber && mobileNumber.username !== username) {
      return res
        .status(501)
        .json({ success: false, message: "Mobile Number already Exist" });
    }
    const Email = await User.findOne({ email });
    if (Email && Email.username !== username) {
      return res
        .status(501)
        .json({ success: false, message: "Email already Exist" });
    }
    await User.findOneAndUpdate(
      { username },
      { mobilenumber, email, firstname, lastname, gender, avatar }
    );
    return res.status(201).json({
      message: "Successfully Updated....!!!",
      success: true,
    });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    if (!req.app.locals.resetSession)
      return res.status(401).send({ error: "Session expired!" });

    const { email, password } = req.body;

    try {
      User.findOne({ email })
        .then((user) => {
          bcrypt
            .hash(password, 12)
            .then((hashedPassword) => {
              User.updateOne(
                { password: hashedPassword },
                function (err, data) {
                  if (err) throw err;
                  req.app.locals.resetSession = false; // reset session
                  return res
                    .status(201)
                    .send({ message: "Password Changed Successfully...!" });
                }
              );
            })
            .catch((e) => {
              return res.status(500).send({
                error: "Enable to hashed password",
              });
            });
        })
        .catch((error) => {
          return res.status(401).send({ error: "Invalid Email Detail" });
        });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};
