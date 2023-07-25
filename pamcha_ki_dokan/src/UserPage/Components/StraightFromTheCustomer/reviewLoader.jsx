import React from "react";
const ReviewLoader = () => {
  return (
    <div className="card bg-white w-[100%] h-auto shadow rounded-ee-3xl rounded-ss-3xl overflow-hidden mt-2 animate-pulse">
      <div className=" py-7 px-3 w-[100%] flex flex-col items-start justify-center ">
        <div className="p-2 inline-block text-left my-1 w-[100%]">
          <spna className="placeholder w-[60%] mr-2 "></spna>
          <spna className="placeholder w-[20%] "></spna>
          <spna className="placeholder w-[82%]"></spna>
          <spna className="placeholder w-[60%]"></spna>
        </div>
        <div className="flex flex-wrap w-[100%] h-[100%]">
          <div className="flex flex-col ml-1 items-start justify-center mt-2">
            <span className="text-[16px] font-medium">
              <span className="placeholder w-[9rem]"></span>
            </span>
            <span className="text-[14px] font-medium text-blue-900">
              <span className="placeholder w-[8rem]"></span>
            </span>
          </div>
          <div
            className="ml-auto flex flex-wrap w-[66px] h-[66px] after:contents-[' '] after:h-[60px] after:w-[60px] after:rounded-[20px] 
          after:bg-[#f9c935] after:absolute after:right-[40px] after:bottom-[40px] after:z-10 rounded-xl overflow-hidden mr-4"
          >
            <span className="placeholder w-[100%] h-[100%] z-30"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewLoader;
