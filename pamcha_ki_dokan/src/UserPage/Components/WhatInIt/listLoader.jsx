import React from "react";
const ListLoader = () => {
  return (
    <li className=" flex items-center justify-center flex-col w-[100%] h-[auto] md:mx-[7px] lg:mx-[15px] mb-6 animate-pulse">
      <div className="p-1 w-[190px] h-[100%]">
        <span className="placeholder w-[100%] h-[142px] rounded "></span>
      </div>
      <div className="flex my-4 w-[70%]">
        <h3 className="text-[26px] md:text-[19px] from-neutral-200 font-semibold leading-4 w-[100%]">
          <span className="placeholder w-[100%]"></span>
        </h3>
      </div>
      <p className=" text-[16px]  font-neutral leading-5 text-center w-[100%]">
        <span className="placeholder w-[60%] mr-3"></span>
        <span className="placeholder w-[30%]"></span>
        <span className="placeholder w-[90%]"></span>
        <span className="placeholder w-[70%]"></span>
      </p>
    </li>
  );
};

export default ListLoader;
