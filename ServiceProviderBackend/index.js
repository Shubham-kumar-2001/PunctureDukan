if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ExpressError = require("./utility/ExpressError");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const HomeRoute = require("./Routes/Home");
const UserRoute = require("./Routes/user");
const ProviderRoute = require("./Routes/provider");
const PaymentsRoute = require("./Routes/Payments");
const OrderRoute = require("./Routes/order");
const cors = require("cors");
const morgan = require("morgan");
const Port = process.env.PORT || 2020;
// const session = require("express-session");

const connectMongo = async () => {
  await mongoose.connect(`${process.env.ATLUS_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
connectMongo()
  .then(() => {
    console.log("Yes I can establish the connection");
  })
  .catch((error) => {
    console.log("OH NO WHAT I MAKE MISTAKE MONGOOES IS NOT WORKING");
    console.log(error);
  });
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// const sessionOption = {
//   key: "sid",
//   secret: process.env.SESSION_SECRET_KEY,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: false,
//     path: "/",
//     HttpOnly: true,
//     expires: Date.now() + 7 * 24 * 3600 * 1000,
//     maxAge: 7 * 24 * 3600 * 1000,
//   },
// };

// app.use(session(sessionOption));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http//localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.use(`${process.env.MAIN_URL}`, HomeRoute);
app.use(`${process.env.MAIN_URL}/auth`, UserRoute);
app.use(`${process.env.MAIN_URL}/serviceprovider`, ProviderRoute);
app.use(`${process.env.MAIN_URL}/serviceorder`, OrderRoute);
app.use(`${process.env.MAIN_URL}/payment`, PaymentsRoute);
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something Went Wrong";
  res.status(statusCode).json(err);
});
app.listen(Port, () => {
  console.log(`Listening on port ${Port}`);
});
