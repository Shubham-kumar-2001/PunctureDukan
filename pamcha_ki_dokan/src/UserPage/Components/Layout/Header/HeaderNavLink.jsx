import React from "react";
import { NavLink } from "react-router-dom";
const HeaderNavLinks = (props) => {
  var str = props.name.replace(/\s+/g, "");
  return (
    <li className="p-0 list-none relative mt-0 mr-[1rem] mb-0 ml-0">
      <NavLink
        activeClassName="text-#758bc5"
        to={`/puncturedukan/${str.toLowerCase()}`}
      >
        <span className="before:content-[' '] before:absolute before:top-0 before:left-0 w-[100%] h-[100%] flex flex-col flex-wrap items-start p-[1rem] justify-center relative">
          <span className="font-medium text-[1.3rem] text-white">
            {props.name}
          </span>
          <span className="block text-inherit opacity-5 m-0"></span>
        </span>
      </NavLink>
    </li>
  );
};

export default HeaderNavLinks;
