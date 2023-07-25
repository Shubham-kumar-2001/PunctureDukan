import React from "react";
const Review = (props) => {
  return (
    <div className="flex flex-wrap bg-white w-[100%] h-auto shadow rounded-ee-3xl rounded-ss-3xl overflow-hidden mt-2">
      <div className=" py-7 px-3 w-[100%] flex flex-col items-start justify-center ">
        <div className=" flex flex-wrap items-start justify-center p-2 my-1 k">
          <span className="text-[18px] font-normal">{props.aboutService}</span>
        </div>
        <div className="flex flex-wrap w-[100%] h-[100%]">
          <div className="flex flex-col ml-1 items-start justify-center mt-2 ">
            <span className="text-[16px] font-medium">{props.name}</span>
            <span className="text-[14px] font-medium text-blue-900">
              {props.userType}
            </span>
          </div>
          <div
            className="ml-auto flex flex-wrap w-[66px] h-[66px] after:contents-[' '] after:h-[60px] after:w-[60px] after:rounded-[20px] 
          after:bg-[#f9c935] after:absolute after:right-[40px] after:bottom-[40px] after:z-10 rounded-xl overflow-hidden mr-4"
          >
            <img src={props.image} alt="Loading.." className="z-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
