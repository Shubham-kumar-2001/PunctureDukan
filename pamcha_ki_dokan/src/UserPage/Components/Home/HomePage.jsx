import React from "react";
import ServiceCarousel from "./../Hero/ServiceCarousel";
import PermisionRequest from "./../Map/PermisionRequest";
import Hero from "./../Hero/Hero";
import WhenEverWhereEver from "./../WhenEver&WhereEver/WhenEver&WhereEver";
import AboutService from "../AboutService/AboutService";
import WhatInIt from "./../WhatInIt/WhatInIt";
import StraightFromTheCustomer from "../StraightFromTheCustomer/StraightFromTheCustomer";
const HomePage = () => {
  return (
    <>
      <ServiceCarousel />
      <PermisionRequest />
      <Hero />
      <WhenEverWhereEver />
      <AboutService />
      <WhatInIt />
      <StraightFromTheCustomer />
    </>
  );
};

export default HomePage;
