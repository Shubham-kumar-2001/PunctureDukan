import React, { useState } from "react";
import HeaderNavLinks from "./HeaderNavLink";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContex from "../../../../Store/AuthContextProvider";
import HeaderNavLinksLoader from "./HeaderNavLinkLoader";
import { toast } from "react-toastify";
import { useHttpClient } from "../../../../Hooks/http-hook";
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
          setAuthorized(headerNav[1].list);
          setNotAuthorized(headerNav[4].list);
        } else {
          handleError(message);
        }
      } catch (err) {
        handleError(error);
      }
    };
    fetchUsers();
  }, [sendRequest]);
  useEffect(() => {}, [authCtx.user_id]);
  return (
    <nav className="flex items-start justify-start mt-0 mr-[1.6rem] mb-0 ml-auto p-0 box-border bg-inherit">
      <ul className="flex text-[20px] mr-[2rem] font-medium pt-1 p-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-inherit dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
