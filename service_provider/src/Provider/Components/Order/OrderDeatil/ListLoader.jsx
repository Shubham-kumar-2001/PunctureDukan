import React from "react";
import useWindowDimensions from "../../../../GetWindowHeightAndWidth/Height&width";
import Card from "../../../../UI/Card";

const ListOrderLoader = (props) => {
  const { width } = useWindowDimensions();
  return (
    <>
      {width >= 500 && (
        <li className="container">
          <Card className="!shadow-xl py-5">
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-3 flex flex-wrap">
                <div className="flex flex-wrap p-0 m-0">
                  <div className="w-[80px] h-[80px] min-w-[80px] ml-[10px] flex flex-col items-center justify-center">
                    <div className="h-[100%] bg-gray-200 rounded dark:bg-gray-700 w-[97%] "></div>
                  </div>
                  <div className="flex flex-col flex-wrap ml-[20px] items-start justify-center">
                    <span className="text-[15px]  text-stone-900">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 "></div>
                    </span>
                    <span className="inline-flex items-start w-[100%]  ">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 "></div>
                    </span>
                  </div>
                </div>
                <div className="ml-[110px] flex flex-col flex-wrap m-0 pb-[10px] justify-center sm:ml-auto">
                  <span className="text-[15px] font-[450] text-stone-900">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 "></div>
                  </span>
                  <div className="flex flex-wrap space-x-2 items-center">
                    <div className="text-[15px] font-[500]">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 "></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relatve  mr-[15px]  flex items-center ml-auto">
                <span className="text-[17px] font-[400] text-zinc-950">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4 "></div>
                </span>
              </div>
              <div className="col-span-2 flex justify-center items-center">
                <div className="flex flex-wrap space-x-2 items-center ml-[5px]">
                  <div className="text-[15px] font-[500]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 "></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </li>
      )}
      {width < 500 && (
        <li className=" container animate-pulse">
          <Card className="flex flex-wrap w-[99%] mx-auto flex-col animate-pulse">
            <div className="border-b-solid border-b-[.2px] font-thin  border-zinc-600 flex flex-wrap mt-4">
              <div className="flex flex-wrap space-x-2 items-center ml-[5px]">
                <div className="text-[15px] font-[500] animate-pulse">
                  <div className="h-2.5 bg-gray-200  rounded-full dark:bg-gray-700 w-24 mb-4 "></div>
                </div>
              </div>
              <div className="relatve block mr-[15px] ml-auto">
                <span className="text-[17px] font-[400] text-zinc-950 animate-pulse">
                  <div className="h-2.5 bg-gray-200 ml-2 rounded-full dark:bg-gray-700 w-20 mb-4 "></div>
                </span>
              </div>
            </div>
            <div className="flex flex-wrap p-0 m-0">
              <div className="w-[80px] h-[82px] min-w-[82px] ml-[10px] flex flex-col items-center justify-center">
                <span className="  h-[95%] w-[95%] m-auto mt-4 animate-pulse text-start">
                  <div className="h-[100%] bg-gray-200 rounded dark:bg-gray-700 w-[97%] "></div>
                </span>
              </div>
              <div className="flex flex-col flex-wrap ml-[20px] mt-3 items-start justify-center">
                <span className="text-[15px] font-[450] text-stone-900 animate-pulse">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4 "></div>
                </span>
                <span className="inline-flex items-start w-[100%] animate-pulse ">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 "></div>
                </span>
              </div>
            </div>
            <div className="ml-[110px] flex flex-col flex-wrap m-0 pb-[10px]">
              <span className="text-[15px] font-[450] text-stone-900 animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 "></div>
              </span>
              <div className="flex flex-wrap space-x-2 items-center animate-pulse">
                <div className="text-[15px] font-[500]">
                  {" "}
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-4 "></div>
                </div>
              </div>
            </div>
          </Card>
        </li>
      )}
    </>
  );
};

export default ListOrderLoader;
