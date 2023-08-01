import React, { useEffect, useState } from "react";
import HeaderNavLinks from "./HeaderNavLink";
import { useContext } from "react";
import AuthContex from "../../../../Store/AuthContextProvider";
import { toast } from "react-toastify";
import { useHttpClient } from "../../../../Hooks/http-hook";
import HeaderNavLinksLoader from "./HeaderNavLinkLoader";
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
          `${process.env.REACT_APP_HOME}navdata`
        );
        const { success, message, headerNav } = responseData;
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
          Array.from({ length: 4 }, (_, i) => <HeaderNavLinksLoader />)}
        {!isLoading &&
          authCtx.user_id &&
          authorized.map((auth, index) =>
            auth.name !== "order" ? (
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
      </ul>
    </nav>
  );
};

export default NavLinks;
