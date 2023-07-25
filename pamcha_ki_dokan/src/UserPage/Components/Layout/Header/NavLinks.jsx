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
    <nav className="flex items-start justify-start md:items-center md:justify-center  mt-0 mr-[1.6rem] mb-0 ml-auto  p-0 box-border">
      <ul className="flex flex-col md:flex-row p-0 m-0 items-start  relative text-red">
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
