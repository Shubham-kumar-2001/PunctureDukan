import React from "react";
const WhenEverHeading = (props) => {
  return (
    <div className="flex flex-col flex-wrap items-start md:items-center  justify-center m-auto py-4">
      {" "}
      <span className=" text-[26px] md:text-[28px] font-semibold py-2 md:mx-auto ml-3 ">
        {props.title}
      </span>
      <span className=" text-[18px] font-medium mx-auto text-gray-900 ml-3 md:ml-0">
        {" "}
        {props.subTitle}{" "}
      </span>
    </div>
  );
};

export default WhenEverHeading;
