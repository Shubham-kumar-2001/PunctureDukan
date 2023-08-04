if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const Review = require("../Module/Home/review");
const WhatInIt = require("../Module/Home/whatInIt");
const WhenEver = require("../Module/Home/whenEver");
const About = require("../Module/Home/About");
const UserNav = require("../Module/Home/User");
const Service = require("../Module/Home/service");

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
const service = [
  {
    image: "https://readyassist.in/assets/images/services/car-tyre_onroad.jpg",
    servicename: "Puncture Repair",
    price: "40",
    aboutServices:
      "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolores veniam minima in provident eum odio",
  },
  {
    servicename: "Battery Jumpstart",
    image:
      "https://readyassist.in/assets/images/services/battery-jumpstart-readyassist.png",
    price: "40",
    aboutServices:
      "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolores veniam minima in provident eum odio",
  },
  {
    servicename: "Towing Service",
    image: "https://readyassist.in/assets/images/services/m-low.jpg",
    price: "40",
    aboutServices:
      "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolores veniam minima in provident eum odio",
  },
  {
    servicename: "On Spot Minor Repair",
    image: "https://readyassist.in/assets/images/services/m-low.jpg",
    price: "40",
    aboutServices:
      "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolores veniam minima in provident eum odio",
  },
  {
    servicename: "Emergency Fuel",
    image: "https://readyassist.in/assets/images/services/fuel-tank.jpg",
    price: "40",
    aboutServices:
      "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolores veniam minima in provident eum odio",
  },
  {
    servicename: "KeyLock Assist",
    image: "https://readyassist.in/assets/images/services/m-low.jpg",
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
const AboutService = [
  {
    title: "Car & Bike Puncture Repair Service",
    description: `Looking for Flat Tyre Puncture nearby? Flat tyre repair or
    puncture repair is a key service in any roadside assistance
    service. Flat tyres generally happen due to punctures on the
    tubes or tyres because of nail or some sharp objects piercing
    it, valve pin issues, valve neck problems, rim bend problem etc.
    Flat tyre also occurs due to long halt of the vehicles. In all
    such cases it is important to examine the tyre and provide the
    right fix which is needed. We at ReadyAssist are highly skilled
    and experienced in doing puncture repairs of both tube &
    tubeless tyres of bikes & cars with utmost care and
    professionalism.`,
    belive: `Do not worry any more when you are stuck for doorstep car
    puncture repair, car puncture service, bike puncture repair,
    doorstep bike puncture service, car tyre repair, bike tyre
    repair, flat tyre puncture repair, etc; we will send an
    experienced puncture mechanic nearby you to help you faster.`,
    image: "https://readyassist.in/assets/images/services/car-tyre_onroad.jpg",
  },
];
const whatinIt = [
  {
    image: "https://etimg.etb2bimg.com/photo/78031008.cms",
    title: "Doorstep Provider",
    subTitle:
      "We will pick you up from where you are and drop you exactly where you need to be.",
  },
  {
    image:
      "https://d1ygf46rsya1tb.cloudfront.net/prod/uploads/2019/03/shutterstock_98277620.jpg",
    title: "Affordability",
    subTitle:
      "We will pick you up from where you are and drop you exactly where you need to be.",
  },
  {
    image:
      "https://premier-carcare.com/wp-content/uploads/2018/01/quick-car-checks.jpg",
    title: "Quick Provider",
    subTitle:
      "We will pick you up from where you are and drop you exactly where you need to be.",
  },
];
const serviceMobileNav = [
  {
    name: "Services",
    fabIcon: `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1jLSIIiHxKU1nS9Ym81Cne9E2f4Lq77_XFBzqVzyFAw&s" alt="Services"/>`,
    list: [
      {
        name: "Puncture Repair",
        fabIcon: `<img src="data:image/png;base64,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" alt="flat Tyre"/>`,
      },
      {
        name: "Battery Jumpstart",
        fabIcon: `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5zT7ismfQeJSIv0zhNRUUr7ShRnAnCI59_A&usqp=CAU" alt="Services"/>`,
      },
      {
        name: "Towing Service",
        fabIcon: `<img src="data:image/jpeg;base64,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" alt="Services"/>`,
      },
      {
        name: "On Spot Minor Repair",
        fabIcon: `<img src="data:image/png;base64,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" alt="Services" />`,
      },
      {
        name: "Emergency Fuel",
        fabIcon: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACxCAMAAAARdrReAAAAtFBMVEX///8AAAD+UAD7+/tXV1egoKCysrI/Pz//9/P/vqB/f38QEBBCQkL+h1BTU1P39/fS0tKTk5MhISHp6emxNwDj4+MMDAzLy8snJyempqaFhYXx8fHa2tpjY2PBwcH/07//4dM2NjYkJCQZGRlxcXH+o3ovLy9tbW3/3c7+aidJSUn/z7r+cTD+gEavr6+NjY3+XRP/tpX+eTz/6d//xKr+jVr/rYj+hEz+mmyyo53+n3OxaUinJWrpAAAETUlEQVR4nO3dZ3faMBQGYNmsBFNWisGGMAIxIyG7Tdr+//9VbMt7IF3JKj3nvt/qHl0e25LwwA4hRRnZLWdtaiIxhk7X6hV+AiCDlRAoFrM+lmSqNYayUF4OfRmq/kQqys2tuKop1qHysxoJquwKUKesxXrYIF7LmLQEshrGt7shsr3mUZ2uNRVaQTd92wnrTeDlZuH6HWbCJj9WOKoP4BorWsF8koQ6pXcbuAbACk3a/k503CRjBd0eOOPTCcuUtQODPFPXM6h10N/nklWE1P3CQ1Djjd94m/mPub3tdhinhUN9M8j0gZ7hlwZ9C9Exkyo63fJP+5NGqnTbX24DVH2/aSu51DK4UV6VZP8c+UtXAFYjb402INQpRrKH0tEEYNHx0owvq0NVp1g5hW74WXTDxLvlbfGHMmSeLQ6Yeqgh9tU1KP5IlhizTCnA3EO3cy1cMAvqm+0n5tWcjhvdoF1s9NCO2yxuyMwKyg95p5twK0cKeaxxsM78RyRB00kFLNrXTMDoCbdX2JfksehUk56w2dLyG4eToDRWjQ4nkCo4RqpLZ9FxCDymvEmNRWmseWo3cObOH8TSWU2RrkVIJ9kFkIUsZCHrv2W9Ly6R9aDrb1eXx3rTdX2/vDjW/sTSX3aXxnrVPRfHflTT5T8817dLY5HFi+tiH4+q5q1rl3W8OBb5dF1LIIsenUIveK681us81tJl3QNZ9LoS9L6I39rJYxF3lngEsuhJAuSSFAlXKjxBSbB+upsLyCJr/9+wuyJbv3E7l/XA07kKzqqdsjZFoRur4Kza61wPQNaTBu/0fofXzLBYnLV482b6VxirR/eiZtfKmuVkRE/1tU24KMba6TRsrsyFJFrqtB+5rpZNG8GlaSO61hOxavuApb+DWOQQuDSz02bMNronpsXuHMW+fEIV29yVZU3Xmkji9x0i1nXE+gFjkb7IDeLEjJfLYjqOyGGRMXx7dRL3w+SyyAx6mz9150gyixALAuumrwJLZ532pN2ZsN/5WTt1K3u5tQKWjCALWchCFrIksz7ED2yqYO0iFvAwsBIWET5oroa1e6Eq4ClGRSzyfnRRe8ZrScpY5MplXTO2RBaykIUsZCELWchCFrKQhSxkIQtZyEIWspCFLGQhC1nIQhaykIUsZCFLAkvop9bVsYR+mF4d695lsT7qo44l8tBDdawF8+9rlLIeebqWMpb3gMgnc0tFLG8Ysm8sRSz/V2Vf7C1VsH59eSr2J8jUsL57qkeex0yVsY5cD7+qYv3ma6mGdVxytlTB+sP7VLXK70SuIIsnyOIJsniCLJ4giyfI4gmyeIIsniCLJ8jiCbJ4gizGjJ67DuzFx7xZr7bMrz0fVPF3AYrjML1tdno4X0lyGF72cnOnXJX3nvF0WueLVJBzL6oSfBczNGfe0DtVMwCzKX9TVeN8gYpS+ppl9aMwiFXGkv/3VVjTLmP9q65V3rn+AsglU563n6MYAAAAAElFTkSuQmCC" alt="Services" />`,
      },
      {
        name: "KeyLock Assist",
        fabIcon: `<img src="data:image/png;base64,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" alt="Services" />`,
      },
    ],
  },

  {
    name: "User",
    fabIcon: `<svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"><path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" /></svg>`,

    list: [
      {
        name: "Profile",
        fabIcon: `<i class="fa fa-user" aria-hidden="true" />`,
      },
      {
        name: "Edit Profile",
        fabIcon: `<i class="fa fa-pencil" aria-hidden="true"></i>`,
      },
    ],
  },
  {
    name: "Authorized",
    list: [
      {
        name: "order",
        fabIcon: `<i class="fa fa-wrench" aria-hidden="true"></i>`,
      },
      {
        name: "Contact Us",
        fabIcon: `<i class="fa fa-address-book" aria-hidden="true" />`,
      },
      {
        name: "Become Provider",
        fabIcon: `<img src="data:image/png;base64,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" alt="about" />`,
      },
      {
        name: "About",
        fabIcon: `<img src="data:image/png;base64,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" alt="about" />`,
      },
    ],
  },
  {
    name: "NotAuthorized",
    list: [
      {
        name: "Contact Us",
        fabIcon: `<i class="fa fa-address-book" aria-hidden="true" />`,
      },
      {
        name: "About",
        fabIcon: `<img src="data:image/png;base64,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" alt="about"/>`,
      },
      {
        name: "Become Provider",
        fabIcon: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///9LS0tAQEBGRkZDQ0M1NTW0tLQ6Ojp+fn45OTlFRUWxsbE9PT0zMzPp6emamprz8/ONjY2Hh4ff39/Y2NhXV1fj4+PS0tKTk5OlpaVjY2Orq6t3d3fKysrZ2dlTU1O+vr5vb294eHhfX1+enp7Dw8MrKysjhO8/AAAKx0lEQVR4nO1d2YKiOhDVQMRAUMCWVVvoZf7/E6+0PXessGglFXSmOS/91DGHVGpLpbJYzJgxY8aMGTNmzJgxY8aMGTNmzJjxzyBKj3WRJ4em3J9Op33ZHJK8WB130aMnRoAoC+LS555kzPUdx1m2OP/1XZdJj7tlHGR/L890lZyEx/wLrX44PpNimazSR08WjahOpGD+CLdr+EzIpP6L1nJTlVzey+4PS15Wm0dP/R5EwbtgY4I5DIeJ9+DZV/L4FmrS+00yPBwfTWIYUbX0TOh9k/SW1XMuZJQLZkzvAiby59uRmyR0ifi1cMPkuThGCcfqzlvw+TNx3JLzu3DMH03sGyuPUj6v4XqrR5M743Uv75jr2RFlUnriAk/K1k294//k/vXRBGN+Y6KO23rYTXyOJbJdummR7rLjqogb5+yRu7f+nccP5Zf5owLqME+W23o3+P+7z20jvXEfwfWzCRkpiPnYzKR3CIbJ/cEuOHijW/lhy5iehi2877k55tNnuT9Ckp0eEl0F4ZBwOdLNX9DjveauHBwxDCwwuIG1GJiNyxtd3/nY8KGFFGvS2d9GtB+YiqFLudnyAdF395O6468DMQRzC+OxK7efo+PhJV8bdb8OZawiGb5i/Rx5TTL8HSh6Cfr8g+wXPsJeR5ebS8hdyPt0jMPXlPvkHKz07QMxiS+e9PmhbE+9SV72faIqE+Kf6cG6h6AT2hCfos/gSutWo48g29uJVTd9y2ibYp+I8q21n9v26DS7gpp3CTrSpuuf9Thy0qK6KbpalJV2XY2o7EqqsGY0egy9sB/YxN3Pasv0v3YJhjROzDiCsEvRSm4j8ro/NE0C/tj9tJ6NvbHv7HnvngieAruOoDp7+l9Zq+GSw5CB9+bzI1mv80DD+0k7qRyX3CwG6md0XJyZr9+5dP0zmCdidFJi08nJCeKoP+3sdoYiWDvXhs3Hu+mbjtEIaXM3J/UTeqjxD6oE+B5WSaWqonNOyBFGEatfkGOUTHTqSXmgDc1O1aiM0BZn6uAhagWWvSkPjt1IR3WncDp/UQ24cbu8HDiYCrET7Gg7HznAIGJFyHDiUQye3LjoiSibxSWSU9Vbc0rMf0fDmX+GDhJKRd6JvDfVmZEoTZ+PnEhwrM2IFHmgcW1WyqjI/T12eMPQYZCq8yTFEapihxguov8cPT/FL8FW2YoeeoQOFCnDykU8esKPFtPOnnGNA35VUYTIpFM3IrmGRgZko1hFjY8EkcA1QO+c8SIGprGNCiinvmFiagOXEK+7umEzYKiTI1B8ZG6WylSWkKNjOwsMX+BXN1tEReh9fNg5XurGtIK8NfzsWNUAoChSjV19GmUotRI9ivYzUacRdHWZxvFZMm4t9D7/B5QMoa9OKzgS0xiiHhdTzYkp89LPaS7NB4q6yc4/cHXPVJVPr/uhFkeoCNHBzhfWI2Kqr+ihfkCnRH7jAAyPpiykw663gZ6Hi+i86Y2iCJjQnEw+uBMNNIQSsoR6IwVgavo6uZOn+y2jte6IC9WO6dnVxTuYmf6e2fT7NZ5RVADdSeddawxgDJ1GfzZpX72a6blcA8YUOt8fbmY97+MbUaeO2LwU7wiG1FKDMOujZyr+RwFK8hxRmqfkoTZFZccugM6fcSgdbeXXRT3HcWWoXbx4jRwYWg2XGbpbHkHa7qVYl/t9kxNdw3sBCkzW6AGgy0yWXSYEsBca3gPYyOb5HguAJlFi/z0FtsJ7YLn8IDKwCAKru1ZwG1qZoinARkQntcA2dA5WZmgKEBmgN+ISfJ8HVMrfAeg4I4+EYf5isrISHHZATJGRCtzFaD01EeAkcdoQCICJ120VwPtGbiVwoOLaKyA1w/baIvq4YAW43Roe0SiiaJO+vmTHz3pVGZWH19diinS+gbugo2haFrsLi6D62ObJ+q0p35e+CDlv71h6npSSMXRBBgBUNSjPEgYWHPvL+S/+dVW0ZXGmwdy23Mv53drkGjqHT1eA08QoU4OP02J798VgQ4ZQ1DB+Gwig8ap0MoZAmaLSECA4RCqpxYQMgcpnNeI/wTkr/j7aZAyL6x9CnU+D0As/i8kYgggIFcSCyAKfZst/fbWocYSQN5qBGDIEtSyo6ALEJfiCif/VdvRSLEcLagwZAvcZFeMBHWUYWXQqCgkZAquG0vnAaUPnBxTUI6toyBDkWlBu2/56FloZ88HRSBnCkwdMKQyoLzBm+DHSS4CSISbKhwxNM7jBsEJ9Eoama/iMDGn34VQMMfuQVJdaZKivSyntoU2G+vbQ0KdRYI+hvk9j6JcqsMdQ3y81jC0U2GOoH1sYxocK7DHUjw8NY3wF9hjqx/iGeRoF9hjq52kMc20K7DHUz7UZ5ksV2GOony+F9/FMTb41hiaiRnpuYY2hybkF6dmTNYYmZ0+k54fWGJYG54ekZ8DWGIJJIitiSM/xbTE0OscnrcWwxdCoFoO0nsYWQ7N6GsqaKFsMzWqiYF2bWRBsiaFhXRtlbaIlhoa1iUp9qVERtCWGpvWlhDXCdhga1wgT1nnbYWhc563U6uvczPsNOwyNa/UJ71tYYUhw34LuzowVhgR3ZsjuPVlhSHHviezumhWGJHfXlPuH+tkaGwxJ7h/S3CFdWGEIW0fo3iGluQe8sMKQ6B4wxV3uFvQMqe5yU9zHb0HPkOw+PkFPhRbkDOl6KhD0xWhBzVBR8kY+s3lvkxbUDNXeJkbVMMb9aVoQMyTtT9PpMaTVb5KYIW2PIeM+US1oGRL3iTLu9dWClCF5ry/Tfm0tCkqGar82ghtLZj33Wow0cEFXQag99yiu1Rn2TVwoiUkIbPbBSt9Ew96XHQ8EwvvEDGWn96Vp/9LteMs28YHQXZb6l2r0oN2sVkFQVcVH3Nx8HNEVp/VHUVVBsLol/7Z60C4WnW7ht5z57Bdjlztrd70t277SfcatNyurTtd0KoL4XtDZ6CWLIdzQ/DZ7QaP7edtgaLWfd0+vp/HDLAsM046IkvZkx/bVp2dova8+8m2EjDsakMMM7b+NgHzfYndYa+Bt0EGZ4n2Lvo7AYqqXbKd5o+QHvDPzsLeCqqneCvoB7z39gDe7fsC7az/g7bwf8P7hD3jDcugd0tO/8w7pRG/Jrh/4luwPeA/4B7zp/Kh3uady9L8w/LY6N3tbPX+St9XPWA+1u3B5g8ryXuHY8KHco5jASqgI+szVRZ4ky/HG4yVnfT2jLyMaN1bWQnoaTtf7nptj/NUs90dSx+xEnJO5G/HYc1Wu9A7BPcphFxw8OZYZ5/ZDtEFk/mjO3mGeLLf1cG51V28b6XWSMPBLOY9tgBv3+h7XLM9ryd0mLlaf2S7dtEh32eeqiBuHn9fu1r8/cgEveO30W++dqO8yKT1xgSclu+9IQ+4nNYIDWN08XtKF65EcgBJgy0ffy9GEf+ssakpECTlHnydTOzHj2CQhpay6YWInb2CCKBc32s/dDSaMnFt7iKrlQMyBgeMtq+eST4DjWzhuv2/RY+FhmqMCfURBKTRJOky8B0+8fH+wqUousbrVZ7ysnnP39SKqEynYvSx9JmRC9LDHlEhXyUl8Pb0yIpg+k2KZrB4VHZkjyoK4bD1s1jqi382gz3/bCprWIy/jIPv71q6LKD3WRZ4cmnJ/Op32ZXNI8mJ13P0L3GbMmDFjxowZM2bMmDFjxowZM2bM+MZ/9JWYepkjbPYAAAAASUVORK5CYII=" alt="about"/>`,
      },
      {
        name: "Login",
        fabIcon: `<svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/></svg>`,
      },
    ],
  },
  {
    name: "ProfileDropdowm",
    list: [
      {
        name: "profile",
        fabIcon: `<i class="fa fa-user" aria-hidden="true" />`,
      },
      {
        name: "Edit profile",
        fabIcon: `<i class="fa fa-pencil" aria-hidden="true"></i>`,
      },
      {
        name: "order",
        fabIcon: `<i class="fa fa-wrench" aria-hidden="true"></i>`,
      },
      {
        name: "ContactUs",
        fabIcon: `<i class="fa fa-address-book" aria-hidden="true" />`,
      },
    ],
  },
  {
    name: "Credential",
    fabIcon: `<i class="fa fa-key" aria-hidden="true"></i>`,
    list: [
      {
        name: "Aadhar card",
        fabIcon: `<i class="fa fa-address-card-o" aria-hidden="true"></i>`,
      },
      {
        name: "Pan Card",
        fabIcon: `<i class="fa fa-address-card-o" aria-hidden="true"></i>`,
      },
      {
        name: "Bank Detail",
        fabIcon: `<i class="fa fa-university" aria-hidden="true"></i>`,
      },
      {
        name: "Bike Detail",
        fabIcon: `<i class="fa fa-motorcycle" aria-hidden="true"></i>`,
      },
    ],
  },
];
const seedDB = async () => {
  await Review.deleteMany({});
  await UserNav.deleteMany({});
  await About.deleteMany({});
  await Service.deleteMany({});
  await WhatInIt.deleteMany({});
  await WhenEver.deleteMany({});
  await Service.insertMany(service);
  await About.insertMany(AboutService);
  await UserNav.insertMany(serviceMobileNav);
  await Review.insertMany(rev);
  await WhatInIt.insertMany(whatinIt);
  await WhenEver.insertMany(WhenEverData);
};

seedDB()
  .then(() => {
    console.log("All Done");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err.message);
  });
