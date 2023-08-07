import React from "react";
import { Link } from "react-router-dom";
const List = (props) => {
  var str = props.name.replace(/\s+/g, "");
  return (
    <li>
      <Link
        to={`${`puncturedukan/${str.toLowerCase()}`} `}
        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-200 group"
      >
        <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-black">
          <div dangerouslySetInnerHTML={{ __html: props.fabIcon }} />
        </span>

        <span class="flex-1 ml-3 whitespace-nowrap">{props.name}</span>
      </Link>
    </li>
  );
};

export default List;
