import React from "react";
import { NavLink } from "react-router-dom";

const ServiceName = (props) => {
  return (
    <li className="p-0 list-none relative mb-1">
      <NavLink activeClassName="text-#758bc5" to="/puncturedukan/services">
        <span
          className="before:content-[' '] before:absolute before:top-0 before:left-0 w-[100%] 
        h-[100%] flex-col flex-wrap items-start  justify-center relative"
        >
          <span className="text-[1.4rem] font-normal md:text-[1.2rem] lg:text-[1.4rem] text-black">
            {props.name}
          </span>
          <span className="block text-inherit opacity-5 m-0"></span>
        </span>
      </NavLink>
    </li>
  );
};

export default ServiceName;
