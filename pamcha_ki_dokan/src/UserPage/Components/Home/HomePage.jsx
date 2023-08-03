import React from "react";
import ServiceCarousel from "./../Hero/ServiceCarousel";
import PermisionRequest from "./../Map/PermisionRequest";
import Hero from "./../Hero/Hero";
import WhenEverWhereEver from "./../WhenEver&WhereEver/WhenEver&WhereEver";
import AboutService from "../AboutService/AboutService";
import WhatInIt from "./../WhatInIt/WhatInIt";
import StraightFromTheCustomer from "../StraightFromTheCustomer/StraightFromTheCustomer";
import { useContext } from "react";
import AuthContex from "../../../Store/AuthContextProvider";
const HomePage = () => {
  const authCtx = useContext(AuthContex);

  return (
    <>
      <ServiceCarousel />
      {authCtx.user_id && <PermisionRequest />}
      <Hero />
      <WhenEverWhereEver />
      <AboutService />
      <WhatInIt />
      <StraightFromTheCustomer />
    </>
  );
};

export default HomePage;
