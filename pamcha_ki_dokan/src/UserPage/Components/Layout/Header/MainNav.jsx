import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderContainer from "./HeaderContainer";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import "./MainNavLink.css";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import AuthContex from "../../../../Store/AuthContextProvider";
import Backdrop from "./../../../../UIElements/Backdrop";
import MobileDrawer from "./../MobileNav/MobileDrawer";
import { useHttpClient } from "../../../../Hooks/http-hook";
import MobileDrawerLoader from "../MobileNav/MobileDrawLoader";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const authCtx = useContext(AuthContex);
  const [serviceMobileNav, setServiceMobileNav] = useState([]);
  const [userMobileNav, setUserMobileNav] = useState([]);
  const [authorized, setAuthorized] = useState([]);
  const [notAuthorized, setNotAuthorized] = useState([]);
  const { isLoading, error, sendRequest } = useHttpClient();
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const openDrawerHandler = async () => {
    setDrawerIsOpen(true);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_HOME}navdata`
      );
      const { success, message, headerNav } = responseData;
      if (success) {
        setServiceMobileNav(headerNav[0]);
        setUserMobileNav(headerNav[1]);
        setAuthorized(headerNav[2]);
        setNotAuthorized(headerNav[3]);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(error);
    }
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
      <ToastContainer />
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen}>
        {isLoading && <MobileDrawerLoader />}
        {!isLoading && (
          <MobileDrawer
            onClick={closeDrawerHandler}
            setDrawerIsOpen={setDrawerIsOpen}
            serviceMobileNav={serviceMobileNav}
            userMobileNav={userMobileNav}
            authorized={authorized}
            notAuthorized={notAuthorized}
          />
        )}
      </SideDrawer>

      <HeaderContainer>
        <button
          class="ml-2 inline-flex items-center p-2 w-10 h-10 justify-center text-md text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={openDrawerHandler}
        >
          <svg
            class="w-6 h-6 text-white "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <Link to="/" class="flex items-center">
          {/* <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8 mr-3"
            alt="Flowbite Logo"
          /> */}
          <span class="ml-[1rem] sm:ml-[2rem] self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-white">
            PunctureDukan
          </span>
        </Link>
        <nav className="main-navigation__header-nav">
          {authCtx.user_id && <ProfileDropDown />}
          <NavLinks />
        </nav>
      </HeaderContainer>
    </>
  );
};

export default MainNavigation;
