import React from "react";
const FooterLoader = () => {
  return (
    <div className="footerLayout container bg-gray-50  mx-auto animate-pulse">
      <div className="flex container mx-auto my-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[100%]">
          <div className=" flex flex-col flex-wrap my-4 w-[100%] ">
            <span className="mx-4 p-2 flex flex-col flex-wrap items-start justify-center w-[100%]">
              <span className="text-[30px] font-medium animate-pulse w-[100%] ">
                <div className="placeholder w-[80%]  sm:w-[70%] my-[1rem]">
                  {" "}
                </div>
              </span>
              <span className="text-[18px] font-normal my-3 flex flex-col justify-start w-[100%]">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[80%]"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
              </span>
            </span>
            <div className="flex flex-wrap w-[100%] h-auto animate-pulse items-center">
              <div class="flex items-center w-full space-x-2">
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-wrap items-end mx-auto  h-auto relative cursor-pointer">
            <span className="text-[30px] font-semibold ml-2 md:ml-3 lg:ml-5 mb-1 mt-4 ">
              <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32 my-2"></div>
            </span>
            <ul className=" flex list-none  justify-center flex-col ml-2 md:ml-3 lg:ml-5 animate-pulse">
              {Array.from({ length: 6 }, (_, i) => (
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 my-2"></div>
              ))}
            </ul>
          </div>
          <span className="text-[18px] font-normal my-3 ">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <ul className=" flex list-none  justify-center flex-col ml-2 md:ml-3 lg:ml-5 animate-pulse">
              {Array.from({ length: 4 }, (_, i) => (
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 my-2"></div>
              ))}
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterLoader;
