import React from "react";

import MobileListLoader from "./MobileNavLoader";
const MobileDrawerLoader = (props) => {
  return (
    <div className="fixed top-0 animate-pulse left-0 z-40 h-screen p-4 overflow-y-auto transition-transform  bg-white w-64 dark:bg-gray-800">
      <h5 className="text-base animate-pulse font-semibold text-gray-500 uppercase dark:text-gray-400">
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32 placeholder"></div>
      </h5>
      <div className="py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {Array.from({ length: 6 }, (_, i) => (
            <MobileListLoader />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileDrawerLoader;
