if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const Carousel = require("../Module/Home/coursel");
const Review = require("../Module/Home/review");
const Services = require("../Module/Home/services");
const WhatInIt = require("../Module/Home/whatInIt");
const WhenEver = require("../Module/Home/whenEver");

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

const caro = [
  {
    image:
      "https://www.themoviedb.org/t/p/original/m8JTwHFwX7I7JY5fPe4SjqejWag.jpg",
  },
  {
    image:
      "https://www.themoviedb.org/t/p/original/gMJngTNfaqCSCqGD4y8lVMZXKDn.jpg",
  },
  {
    image:
      "https://www.themoviedb.org/t/p/original/rZAUAePCueGzTdDzRQe9wD8x1Ov.jpg",
  },
  {
    image:
      "https://www.themoviedb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
  },
];

const service = [
  {
    name: "Puncture Repair",
    image:
      "https://www.carblogindia.com/wp-content/uploads/2022/12/tyre-puncture-repair-kit.jpg",
    price: "40",
    aboutServices:
      "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolores veniam minima in provident eum odio",
  },
  {
    name: "Battery Jumpstart",
    image:
      "https://www.carblogindia.com/wp-content/uploads/2022/12/tyre-puncture-repair-kit.jpg",
    price: "40",
    aboutServices:
      "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolores veniam minima in provident eum odio",
  },
  {
    name: "Towing Service",
    image:
      "https://www.carblogindia.com/wp-content/uploads/2022/12/tyre-puncture-repair-kit.jpg",
    price: "40",
    aboutServices:
      "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolores veniam minima in provident eum odio",
  },
  {
    name: "On Spot Minor Repair",
    image:
      "https://www.carblogindia.com/wp-content/uploads/2022/12/tyre-puncture-repair-kit.jpg",
    price: "40",
    aboutServices:
      "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolores veniam minima in provident eum odio",
  },
  {
    name: "Emergency Fuel",
    image:
      "https://www.carblogindia.com/wp-content/uploads/2022/12/tyre-puncture-repair-kit.jpg",
    price: "40",
    aboutServices:
      "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolores veniam minima in provident eum odio",
  },
  {
    name: "KeyLock Assist",
    image:
      "https://www.carblogindia.com/wp-content/uploads/2022/12/tyre-puncture-repair-kit.jpg",
    price: "40",
    aboutServices:
      "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolores veniam minima in provident eum odio",
  },
];

const rev = [
  {
    name: "Shubham Kumar",
    rating: "7",
    userType: "Customer",
    body: "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem error corporis doloribus minus atque aspernatur reprehenderit nesciunt, mollitia minima eligendi odit sunt natus magnam dicta, animi necessitatibus distinctio soluta. Minus?",
    image:
      "https://content.rapido.bike/uploads/test/originals/00a7ad31-fbab-45c2-8ec7-85c6f9ac18bb.png",
  },
  {
    name: "Shubham Kumar",
    rating: "7",
    userType: "Customer",
    body: "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem error corporis doloribus minus atque aspernatur reprehenderit nesciunt, mollitia minima eligendi odit sunt natus magnam dicta, animi necessitatibus distinctio soluta. Minus?",
    image:
      "https://content.rapido.bike/uploads/test/originals/00a7ad31-fbab-45c2-8ec7-85c6f9ac18bb.png",
  },
  {
    name: "Shubham Kumar",
    rating: "7",
    userType: "Customer",
    body: "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem error corporis doloribus minus atque aspernatur reprehenderit nesciunt, mollitia minima eligendi odit sunt natus magnam dicta, animi necessitatibus distinctio soluta. Minus?",
    image:
      "https://content.rapido.bike/uploads/test/originals/00a7ad31-fbab-45c2-8ec7-85c6f9ac18bb.png",
  },
  {
    name: "Shubham Kumar",
    rating: "7",
    userType: "Customer",
    body: "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem error corporis doloribus minus atque aspernatur reprehenderit nesciunt, mollitia minima eligendi odit sunt natus magnam dicta, animi necessitatibus distinctio soluta. Minus?",
    image:
      "https://content.rapido.bike/uploads/test/originals/00a7ad31-fbab-45c2-8ec7-85c6f9ac18bb.png",
  },
];
const WhenEverData = [
  {
    image: "https://readyassist.in/assets/images/services/onspotservice.svg",
    title: "24/7 Onspot Service",
    subTitle:
      " Be assured that we got you covered, 24/7 and 365 days, anywhere in India",
  },
  {
    image: "https://readyassist.in/assets/images/services/onspotservice.svg",
    title: "24/7 Onspot Service",
    subTitle:
      " Be assured that we got you covered, 24/7 and 365 days, anywhere in India",
  },
  {
    image: "https://readyassist.in/assets/images/services/onspotservice.svg",
    title: "24/7 Onspot Service",
    subTitle:
      " Be assured that we got you covered, 24/7 and 365 days, anywhere in India",
  },
  {
    image: "https://readyassist.in/assets/images/services/onspotservice.svg",
    title: "24/7 Onspot Service",
    subTitle:
      " Be assured that we got you covered, 24/7 and 365 days, anywhere in India",
  },
];
const whatinIt = [
  {
    image: "https://www.rapido.bike/images/CCcare_1.webp",
    title: "Doorstep Pick-Up",
    subTitle:
      "We will pick you up from where you are and drop you exactly where you need to be.",
  },
  {
    image: "https://www.rapido.bike/images/CCcare_1.webp",
    title: "Doorstep Pick-Up",
    subTitle:
      "We will pick you up from where you are and drop you exactly where you need to be.",
  },
  {
    image: "https://www.rapido.bike/images/CCcare_1.webp",
    title: "Doorstep Pick-Up",
    subTitle:
      "We will pick you up from where you are and drop you exactly where you need to be.",
  },
];

const seedDB = async () => {
  await Carousel.deleteMany({});
  await Review.deleteMany({});
  await Services.deleteMany({});
  await WhatInIt.deleteMany({});
  await WhenEver.deleteMany({});
  await Carousel.insertMany(caro);
  await Services.insertMany(service);
  await Review.insertMany(rev);
  await WhatInIt.insertMany(whatinIt);
  await WhenEver.insertMany(WhenEverData);
};

seedDB().then(() => {
  console.log("All Done");
  mongoose.connection.close();
});
