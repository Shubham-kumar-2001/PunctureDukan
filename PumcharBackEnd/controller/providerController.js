const ProviderAuth = require("../Module/Provider/providerAuth");
const ProviderOTPVerification = require("../Module/Provider/providerOTPVerification");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const { createProviderSecretToken } = require("../utility/providerJWT");
const ProviderService = require("../Module/Provider/providerService");
const Service = require("../Module/Home/service");
// const client = require("twilio")(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );
module.exports.Register = async (req, res) => {
  try {
    const { email, password, mobilenumber, firstname, lastname } = req.body;
    console.log(req.body);
    const existingUser = await ProviderAuth.findOne({
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
        .status(403)
        .json({ success: false, message: "User already exists" });
    }
    const username =
      firstname.trim().charAt(0).toUpperCase() +
      firstname.trim().slice(1).toLowerCase() +
      "_" +
      mobilenumber.trim().slice(5, 11);
    const provider = await ProviderAuth.create({
      email,
      password,
      mobilenumber,
      firstname,
      lastname,
      username,
    });
    const token = createProviderSecretToken(provider.username);
    res.cookie("providerjwt", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 3600 * 1000,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      token,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: error.message + "user error" });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, mobilenumber, password } = req.body;
    if ((!email && !mobilenumber) || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    try {
      const provider = await ProviderAuth.findOne({
        $or: [
          {
            email,
          },
          {
            mobilenumber,
          },
        ],
      });
      if (!provider) {
        return res.json({
          success: false,
          message: "Incorrect password ",
        });
      }
      console.log(provider);
      const auth = await bcrypt.compare(password, provider.password);
      console.log(auth);
      if (!auth) {
        return res.json({
          success: false,
          message: "Incorrect password or email",
        });
      }

      const token = createProviderSecretToken(provider.username);
      res.cookie("providerjwt", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 3600 * 1000,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        message: "User logged in successfully",
        success: true,
        token: token,
      });
    } catch (err) {
      res
        .status(404)
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
      const provider = await ProviderAuth.findOne({
        $or: [
          {
            email,
          },
          {
            mobilenumber,
          },
        ],
      });
      if (!provider) {
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
      const existingOTPUser = await ProviderOTPVerification.findOne({
        email,
        mobilenumber,
      });
      if (existingOTPUser) {
        const hashPassword = await bcrypt.hash(otp, 12);
        await ProviderOTPVerification.findOneAndUpdate(
          { email, mobilenumber },
          {
            otp: hashPassword,
          }
        );
      } else {
        await ProviderOTPVerification.create({
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
      const provider = await ProviderAuth.findOne({
        $or: [
          {
            email,
          },
          {
            mobilenumber,
          },
        ],
      });
      if (!provider) {
        return res.json({
          success: false,
          message: "Incorrect password or email",
        });
      }
      const otpHolder = await ProviderOTPVerification.findOne({
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
        await ProviderOTPVerification.findByIdAndDelete(otpHolder._id);
      }
      const token = createProviderSecretToken(user.username);
      res.cookie("providerjwt", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 3600 * 1000,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        message: "User logged in successfully",
        success: true,
        token,
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
      const existingProvider = await ProviderAuth.findOne({
        $or: [
          {
            email,
          },
          {
            mobilenumber,
          },
        ],
      });
      if (existingProvider) {
        return res.json({
          success: false,
          message: "Already exist",
        });
      }
      const otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const existingOTPUser = await ProviderOTPVerification.findOne({
        email,
        mobilenumber,
      });
      if (existingOTPUser) {
        const hashPassword = await bcrypt.hash(otp, 12);
        await ProviderOTPVerification.findOneAndUpdate(
          { email, mobilenumber },
          {
            otp: hashPassword,
          }
        );
      } else {
        await ProviderOTPVerification.create({
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
      console.log(err.message);
      res.status(404).json({ message: "User error!", success: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something Else Went Wrong!",
      success: false,
    });
  }
};
module.exports.verifyOTP = async (req, res) => {
  try {
    const { code, email, mobilenumber } = req.body;
    const otpHolder = await ProviderOTPVerification.findOne({
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
      await ProviderOTPVerification.findByIdAndDelete(otpHolder._id);
    }
    res.status(201).json({
      message: "verify successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Else Went Wrong!" + err.message,
      success: false,
    });
  }
};
module.exports.logout = async (req, res) => {
  try {
    const { username } = req.provider;
    const existingUser = await ProviderAuth.findOne({ username });
    if (!existingUser) {
      res.json({ success: false, message: "Invalid user" });
    }
    // await ProviderAuth.findOneAndUpdate({ username }, { isActive: false });
    await res.clearCookie("providerjwt");
    res.cookie("providerjwt", "none", {
      httpOnly: true,
    });
    res.status(201).json({ success: true, message: "Logout Successfully" });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, message: "Something Went Wrong" + err.message });
  }
};
module.exports.getUserData = async (req, res) => {
  try {
    const { username } = req.provider;
    const user = await ProviderAuth.findOne({ username });
    if (!user) {
      return res
        .status(501)
        .json({ success: false, message: "Couldn't find the User" });
    }
    const { password, ...userData } = Object.assign({}, user.toJSON());
    return res.status(200).json({ success: true, userData });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: "Can not find the User Data" });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { username } = req.provider;
    const { mobilenumber, email, firstname, lastname, gender, avatar } =
      req.body;
    const user = await ProviderAuth.findOne({ username });
    if (!user) {
      return res
        .status(501)
        .json({ success: false, message: "Couldn't find the User" });
    }
    const mobileNumber = await ProviderAuth.findOne({ mobilenumber });
    if (mobileNumber && mobileNumber.username !== username) {
      return res
        .status(501)
        .json({ success: false, message: "Mobile Number already Exist" });
    }
    const Email = await ProviderAuth.findOne({ email });
    if (Email && Email.username !== username) {
      return res
        .status(501)
        .json({ success: false, message: "Email already Exist" });
    }
    await ProviderAuth.findOneAndUpdate(
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

module.exports.serviceProvidedByProvider = async (req, res) => {
  try {
    const { username } = req.provider;
    const { servicename, latitude, longitude, shopname, price } = req.body;
    const user = await ProviderAuth.findOne({ username });
    if (!user) {
      return res
        .status(501)
        .json({ success: false, message: "Couldn't find the User" });
    }
    const service = await Service.findOne({ name: servicename });
    if (!service) {
      return res.status(501).json({
        success: false,
        message: "Could not find the Services",
      });
    }
    const existingService = await ProviderService.findOne({
      $and: [
        {
          username,
        },
        {
          servicename,
        },
      ],
    });
    if (existingService) {
      return res
        .status(501)
        .json({ success: false, message: "Service already register" });
    }
    const locate = { type: "Point", coordinates: [latitude, longitude] };
    const { image } = service;
    await ProviderService.create({
      providerlocation: locate,
      username,
      image,
      servicename,
      price,
      shopname,
    });
    res
      .status(201)
      .json({ success: true, message: "Service register successfully" });
  } catch (err) {
    res.status(301).json({
      success: false,
      message: "Something went wrong" + " " + err.message,
    });
  }
};
