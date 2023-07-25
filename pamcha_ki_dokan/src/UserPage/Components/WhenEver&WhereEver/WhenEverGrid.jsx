import React from "react";
const WhenEverGrid = (props) => {
  return (
    <div className="grid grid-cols-4 gap-4 mx-2 my-3 bg-gray-100 shadow-md h-[150px]">
      <div className="grid grid-cols-1  ">
        <span className=" m-auto flex flex-wrap relative w-[100px] h-[100px] items-center justify-center">
          <img src={props.image} alt="No internet" className="flex" />
        </span>
      </div>
      <div className="col-span-3 flex flex-wrap">
        <div className="flex flex-col flex-wrap items-start justify-center md:mr-[20px]">
          <span className=" text-[23px] font-medium ">{props.title}</span>
          <div className="flex relative flex-wrap mt-[10px]">
            <span className="text-[17px] font-light">{props.subTitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhenEverGrid;
