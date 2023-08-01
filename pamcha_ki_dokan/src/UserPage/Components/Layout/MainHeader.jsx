import React from "react";
import MainNavigation from "./Header/MainNav";
import { useState } from "react";
import { useHttpClient } from "../../../Hooks/http-hook";
import { toast } from "react-toastify";
import { useEffect } from "react";
const MainHeader = () => {
  return <MainNavigation />;
};

export default MainHeader;
