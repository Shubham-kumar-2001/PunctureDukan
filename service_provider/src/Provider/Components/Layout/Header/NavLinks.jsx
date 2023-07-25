import React from "react";
import HeaderNavLinks from "./HeaderNavLink";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContex from "../../../../Store/AuthContextProvider";
import { authHeaderData, notAuthhHeaderData } from "./../../../../Data/index";
const NavLinks = () => {
  const authCtx = useContext(AuthContex);
  useEffect(() => {}, [authCtx.user_id]);
  return (
    <nav className="flex items-start justify-start mt-0 mr-[1.6rem] mb-0 ml-auto p-0 box-border bg-inherit">
      <ul className="flex text-[20px] mr-[2rem] font-medium pt-1 p-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-inherit dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {authCtx.user_id &&
          authHeaderData.map((item, index) => (
            <HeaderNavLinks key={`${index} ${item.name}`} name={item.name} />
          ))}
        {!authCtx.user_id &&
          notAuthhHeaderData.map((item, index) => (
            <HeaderNavLinks key={`${index} ${item.name}`} name={item.name} />
          ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
