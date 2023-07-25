import React from "react";
import MobileList from "./mobileList";
const MobilenavButton = (props) => {
  return (
    <li>
      <button
        type="button"
        class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        onClick={props.handler}
      >
        <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
          {props.fabIcon}
        </span>
        <span class="flex-1 ml-3 text-left whitespace-nowrap">
          {props.name === "User" ? props.username : props.name}
        </span>
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <ul
        onClick={props.onClick}
        class={`py-2 space-y-2 ml-5 ${props.Drawer ? "" : "!hidden"}`}
      >
        {props.list.map((lists, index) => (
          <MobileList
            name={lists.name}
            onClick={props.onClick}
            fabIcon={lists.fabIcon}
            key={index}
          />
        ))}
      </ul>
    </li>
  );
};

export default MobilenavButton;
