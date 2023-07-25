import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../Components/Layout/MainHeader";
import Footer from "../Components/Layout/Footer/footer";
const RouterLayout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default RouterLayout;
