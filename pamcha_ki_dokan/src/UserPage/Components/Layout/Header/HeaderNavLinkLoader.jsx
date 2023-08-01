import React from "react";
const HeaderNavLinksLoader = () => {
  return (
    <li className="p-0 list-none relative mt-0 mr-[1rem] mb-0 ml-0 animate-pulse">
      <span className="before:content-[' '] before:absolute before:top-0 before:left-0 w-[100%] h-[100%] flex flex-col flex-wrap items-start p-[1rem] justify-center relative">
        <span className="font-medium text-[1.3rem] text-white">
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-24 placeholder"></div>
        </span>
        <span className="block text-inherit opacity-5 m-0"></span>
      </span>
    </li>
  );
};

export default HeaderNavLinksLoader;
