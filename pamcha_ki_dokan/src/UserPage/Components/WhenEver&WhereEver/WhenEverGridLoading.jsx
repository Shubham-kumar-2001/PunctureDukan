import React from "react";
const WhenEverGridLoader = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mx-2 my-3 bg-gray-100 shadow-md h-[150px] w-[98%] animate-pulse">
      <div className="grid grid-cols-1  ">
        <span className=" m-auto flex flex-wrap relative w-[100px] h-[100px] items-center justify-center">
          <span className="placeholder w-[100%] h-[100%] rounded-lg"></span>
        </span>
      </div>
      <div className="col-span-3 flex flex-wrap">
        <div className="flex flex-col ml-6 flex-wrap items-start justify-center md:mr-[20px] w-[100%]">
          <span className=" text-[23px] font-medium w-[100%]">
            <span className="placeholder w-[80%] "></span>
          </span>
          <div className="flex relative flex-wrap mt-[10px] w-[100%]">
            <span className="text-[17px] font-light w-[100%]">
              <span className="placeholder w-[50%]"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhenEverGridLoader;
