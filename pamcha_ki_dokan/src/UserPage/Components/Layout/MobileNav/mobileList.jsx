import React from "react";
import { Link } from "react-router-dom";
const MobileList = (props) => {
  var str = props.name.replace(/\s+/g, "");
  // console.log(props.isLoading, "load");
  return (
    <li onClick={props.onClick}>
      <Link
        to={`${
          props.service
            ? "puncturedukan/services"
            : `puncturedukan/${str.toLowerCase()}`
        } `}
        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
          <div dangerouslySetInnerHTML={{ __html: props.fabIcon }} />
        </span>

        <span class="flex-1 ml-3 whitespace-nowrap">{props.name}</span>
      </Link>
    </li>
  );
};

export default MobileList;
