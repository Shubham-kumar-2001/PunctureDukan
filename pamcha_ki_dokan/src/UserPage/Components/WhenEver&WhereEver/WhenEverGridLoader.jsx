import React from "react";
const WhenEverHeadingLoader = () => {
  return (
    <div className="flex flex-col flex-wrap items-start md:items-center justify-center m-auto py-4 w-[70%] animate-pulse">
      {" "}
      <span className=" text-[26px] md:text-[28px] font-semibold py-2 md:mx-auto ml-3 w-[100%] ">
        <span className="placeholder w-[70%]"></span>
      </span>
      <span className=" text-[18px] font-medium mx-auto text-gray-900 ml-3 md:ml-0 w-[100%]">
        {" "}
        <span className="placeholder w-[50%]"></span>
      </span>
    </div>
  );
};

export default WhenEverHeadingLoader;
