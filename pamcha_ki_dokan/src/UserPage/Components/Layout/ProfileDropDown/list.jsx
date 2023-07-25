import React from "react";
import { Link } from "react-router-dom";
import style from "./ProfileDropDowm.module.css";
const ProfileList = (props) => {
  var str = props.name.replace(/\s+/g, "");
  return (
    <li
      class={`py-[0.4rem] pr-0 pl-[1rem] ${style.profile_dropdown_list_item}`}
    >
      <Link
        to={`/puncturedukan/${str.toLowerCase()}`}
        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        <span
          className={`class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${style.profile_dropdown_list_item_link}`}
        >
          {props.fonticon}
        </span>
        <span class="flex-1 ml-3 whitespace-nowrap">{props.name}</span>
      </Link>
    </li>
  );
};

export default ProfileList;
