import React from "react";
const MobileListLoader = (props) => {
  return (
    <li>
      <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-6 placeholder"></div>
        </span>
        <span class="flex-1 ml-3 whitespace-nowrap">
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-24 placeholder"></div>
        </span>
      </div>
    </li>
  );
};

export default MobileListLoader;
