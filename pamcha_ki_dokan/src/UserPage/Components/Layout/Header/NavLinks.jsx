import React, { useEffect, useState } from "react";
import HeaderNavLinks from "./HeaderNavLink";
import { useContext } from "react";
import AuthContex from "../../../../Store/AuthContextProvider";
import { toast } from "react-toastify";
import { useHttpClient } from "../../../../Hooks/http-hook";
import HeaderNavLinksLoader from "./HeaderNavLinkLoader";
import { NavLink } from "react-router-dom";
const NavLinks = () => {
  const authCtx = useContext(AuthContex);
  const [authorized, setAuthorized] = useState([]);
  const [notAuthorized, setNotAuthorized] = useState([]);
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  const { isLoading, error, sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `https://puncturedukan.onrender.com/api/puncturedukan/navdata`
        );
        const { success, message, headerNav } = responseData;
        console.log(responseData, "datata");
        console.log(headerNav);
        if (success) {
          setAuthorized(headerNav[2].list);
          setNotAuthorized(headerNav[3].list);
        } else {
          handleError(message);
        }
      } catch (err) {
        handleError(error);
      }
    };
    fetchUsers();
  }, [sendRequest]);
  return (
    <nav
      className={` ${
        isLoading ? "animate-pulse" : ""
      }flex items-start justify-start md:items-center md:justify-center   mt-0 mr-[1.6rem] mb-0 ml-auto  p-0 box-border`}
    >
      <ul
        className={`flex flex-col md:flex-row p-0 m-0 items-start  relative text-red ${
          isLoading ? "animate-pulse" : ""
        }`}
      >
        {isLoading &&
          Array.from({ length: 4 }, (_, i) => <HeaderNavLinksLoader key={i} />)}
        {!isLoading &&
          authCtx.user_id &&
          authorized.map((auth, index) =>
            auth.name !== "order" && auth.name!=="Add Service" ? (
              <HeaderNavLinks name={auth.name} key={index} />
            ) : (
              ""
            )
          )}
        {!isLoading &&
          !authCtx.user_id &&
          notAuthorized.map((auth, index) => (
            <HeaderNavLinks name={auth.name} key={index} />
          ))}
        <li className="p-0 list-none relative mt-0 mr-[1rem] mb-0 ml-0">
          <NavLink
            activeClassName="text-#758bc5"
            to={`${process.env.REACT_APP_PROVIDER}`}
          >
            <span className="before:content-[' '] before:absolute before:top-0 before:left-0 w-[100%] h-[100%] flex flex-col flex-wrap items-start p-[1rem] justify-center relative">
              <span className="font-medium text-[1.3rem] text-white">
                Become Provider
              </span>
              <span className="block text-inherit opacity-5 m-0"></span>
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavLinks;
