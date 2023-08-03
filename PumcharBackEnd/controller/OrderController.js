const OrderService = require("../Module/Order/OrderService");
const ProviderAuth = require("../Module/Provider/providerAuth");
const Provider = require("../Module/Provider/providerService");
const User = require("../Module/userModule/user");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const UserOrder = require("../Module/userModule/UserOrder");
const ProviderOrder = require("../Module/Provider/ProviderOrder");
const GeoNear = require("../Module/Order/GeoNearData");

module.exports.fetchingNearServiceProviderLocation = async (req, res) => {
  try {
    const { longitude, latitude, servicename } = req.body;
    const { username } = req.user;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid user" });
    }
    const { mobilenumber, firstname, lastname } = user;
    const providerData = await Provider.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(latitude), parseFloat(longitude)],
          },
          spherical: true,
          query: { servicename: servicename },
          distanceField: "calcDistance",
        },
      },
    ]);
    if (providerData.length == 0) {
      return res
        .status(301)
        .json({ success: false, message: "No Provider Found" });
    }
    const userData = [
      {
        mobilenumber,
        firstname,
        lastname,
        longitude,
        latitude,
        username,
      },
    ];
    const userProvider = providerData;
    await GeoNear.create({ Geonear: userProvider, userdata: userData });
    res.status(201).json({
      success: true,
      message: "Waiting for the provider",
    });
  } catch (err) {
    console.log(err.message);
    res.status(501).json({ success: false, message: err.message });
  }
};

module.exports.fetchRequestForService = async (req, res) => {
  try {
    const provider = await GeoNear.findOne({});
    console.log(provider);
    res.status(201).json({ success: true, provider });
  } catch (err) {
    console.log(err.message);
    res.status(501).json({ success: false, message: err.message + "ghjgj" });
  }
};

module.exports.onReject = async (req, res) => {
  try {
    const { order_id, username } = req.body;
    const providerData = await GeoNear.findById({ _id: order_id });
    if (providerData.Geonear.length === 1) {
      await GeoNear.findByIdAndDelete({ _id: order_id });
    } else {
      await GeoNear.findByIdAndUpdate(
        { _id: order_id },
        { $pull: { Geonear: { username } } },
        { new: true }
      );
    }
    res
      .status(201)
      .json({ success: true, message: "Successfully skip the service" });
  } catch (err) {
    console.log(err.message);
    res.status(501).json({ success: false, message: "Something went wrong" });
  }
};

module.exports.acceptOrder = async (req, res) => {
  try {
    const {
      userlongitude,
      userlatitude,
      usermobilenumber,
      userfirstname,
      userlastname,
      servicename,
      providerlongitude,
      providerlatitude,
      userusername,
      distance,
      image,
      price,
      shopname,
      order_id,
    } = req.body;
    const { username } = req.provider;
    const provider = await ProviderAuth.findOne({ username });
    if (!provider) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Provider" });
    }
    const { firstname, lastname, mobilenumber } = provider;
    const location = {
      type: "Polygon",
      coordinates: [
        [
          [userlatitude, userlongitude],
          [providerlatitude, providerlongitude],
        ],
      ],
    };
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    console.log(otp);
    const hashOtp = await bcrypt.hash(otp, 12);
    const data = await OrderService.create({
      usermobilenumber,
      userfirstname,
      userlastname,
      servicename,
      userusername,
      distance,
      image,
      price,
      shopname,
      location,
      providerfirstname: firstname,
      providerlastname: lastname,
      providermobilenumber: mobilenumber,
      otp: hashOtp,
      providerusername: username,
      status: "pending",
    });
    const serviceOrder_id = data._id;
    const providerlocation = {
      type: "Point",
      coordinates: [providerlatitude, providerlongitude],
    };
    await UserOrder.create({
      username: userusername,
      otp,
      servicename,
      image,
      providerlocation,
      price,
      serviceprovidername: firstname + "" + lastname,
      distance,
      shopname,
      providermobilenumber: mobilenumber,
      status: "Pending",
    });
    await GeoNear.findByIdAndDelete({ _id: order_id });
    res.status(201).json({
      success: true,
      message: "Successfully you got Customer",
      serviceOrder_id,
    });
  } catch (err) {
    console.log(err.message);
    res.status(201).json({ success: false, message: "Something went wrong" });
  }
};

module.exports.fetchUserOrderDetail = async (req, res) => {
  try {
    const { username } = req.user;
    const userOrderdata = await UserOrder.findOne({ username });
    if (!userOrderdata) {
      return res.status(501).json({ success: false, message: "Invalid User" });
    }
    await UserOrder.findOneAndDelete({ username });
    res.status(201).json({
      success: true,
      message: "Successfully got Provider",
      userOrderdata,
    });
  } catch (err) {
    // console.log(err.message);
    res.status(501).json({ success: false, message: err.message });
  }
};
module.exports.OrderService = async (req, res) => {
  try {
    const { username } = req.user;
    const orderservice = await OrderService.find({ username });
    if (!orderservice) {
      res.json({ success: false, message: "You haven't palce any order" });
    }
    res.status(201).json({ success: true, orderservice });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};
module.exports.ServiceProvided = async (req, res) => {
  try {
    const { username } = req.provider;
    const orderservice = await OrderService.find({ username });
    if (!orderservice) {
      res.json({ success: false, message: "You haven't served any services" });
    }
    res.status(201).json({ success: true, orderservice });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};
// module.exports.fetchProviderOrderDetail = async (req, res) => {
//   try {
//     const { username } = req.provider;
//     const orderData = await OrderService.findOne({ username });
//     if (!orderData) {
//       return res.status(501).json({ success: false, message: "Invalid User" });
//     }
//     const {
//       userfirstname,
//       userlastname,
//       servicename,
//       location,
//       price,
//       image,
//       distance,
//       shopname,
//       status,
//       usermobilenumber,
//     } = orderData;
//     const serviceusername = userfirstname + " " + userlastname;
//     const providerOrder = {
//       serviceusername,
//       servicename,
//       location,
//       price,
//       image,
//       distance,
//       shopname,
//       status,
//       usermobilenumber,
//     };
//     const ProviderOrderdata = await ProviderOrder.create({ providerOrder });
//     res.status(201).json({
//       success: true,
//       message: "Successfully got Provider",
//       ProviderOrderdata,
//     });
//   } catch (error) {
//     res.status(501).json({ success: false, message: "Something went Wrong" });
//   }
// };

module.exports.onArrive = async (req, res) => {
  try {
    const { otp, order_id } = req.body;
    console.log(req.body);
    const orderData = await OrderService.findById({ _id: order_id });
    if (!orderData) {
      return res.status(501).json({ success: false, message: "Invalid Order" });
    }
    console.log(orderData);
    console.log(await bcrypt.hash(otp, 12));
    const validate = await bcrypt.compare(otp, orderData.otp);
    if (!validate) {
      return res.status(301).json({ success: false, message: "Incorrect Otp" });
    }
    res.status(201).json({ success: true, message: "Successfully Arrive" });
  } catch (err) {
    console.log(err.message);
    res.status(501).json({ success: false, message: err.message });
  }
};
