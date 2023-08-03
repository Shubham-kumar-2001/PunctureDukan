import React from "react";
import useWindowDimensions from "./../../../../GetWindowHeightAndWidth/Height&width";

const ListOrderLoader = (props) => {
  const { width } = useWindowDimensions();
  return (
    <>
      {width >= 500 && (
        <li className="card container shadow rounded border-[1]">
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-3 flex flex-wrap">
              <div className="flex flex-wrap p-0 m-0">
                <div className="w-[80px] h-[82px] min-w-[82px] ml-[10px] flex flex-col items-center justify-center">
                  <span className=" animate-pulse h-[95%] w-[95%] m-auto mt-4  text-start">
                    <span className="placeholder h-[100%] w-[97%] m-auto"></span>
                  </span>
                </div>
                <div className="flex flex-col flex-wrap ml-[20px] items-start justify-center">
                  <span className="text-[15px] font-[450] text-stone-900">
                    <span className="placeholder w-[50%] md:w-[70%] lg:w-[40%]"></span>
                  </span>
                  <span className="inline-flex items-start w-[100%]  ">
                    <span className="text-[13px] font-[450] text-stone-800 bg-slate-100 p-1 pl-0">
                      <span className="placeholder w-[50%] md:w-[70%] lg:w-[40%]"></span>
                    </span>
                  </span>
                </div>
              </div>
              <div className="ml-[110px] flex flex-col flex-wrap m-0 pb-[10px] justify-center sm:ml-auto">
                <span className="text-[15px] font-[450] text-stone-900">
                  <span className="placeholder w-[50%] md:w-[70%] lg:w-[40%]"></span>
                </span>
                <div className="flex flex-wrap space-x-2 items-center">
                  <div className="rounded-[50%] bg-green-700 w-[7px] h-[7px]"></div>
                  <div className="text-[15px] font-[500]">
                    <span className="placeholder w-[50%] md:w-[70%] lg:w-[40%]"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relatve  mr-[15px]  flex items-center ml-auto">
              <span className="text-[17px] font-[400] text-zinc-950">
                <span className="placeholder w-[50%] md:w-[70%] lg:w-[40%]"></span>
              </span>
            </div>
            <div className="col-span-2 flex justify-center items-center">
              <div className="flex flex-wrap space-x-2 items-center ml-[5px]">
                <div className="rounded-[50%] bg-green-700 w-[10px] h-[10px]"></div>
                <div className="text-[15px] font-[500]">
                  <span className="placeholder w-[50%] md:w-[70%] lg:w-[40%]"></span>
                </div>
              </div>
            </div>
          </div>
        </li>
      )}
      {width < 500 && (
        <li className="card container shadow rounded border-[1]">
          <div classname="flex flex-wrap w-[99%] mx-auto flex-col">
            <div className="border-b-solid border-b-[.2px] font-thin border-zinc-600 flex flex-wrap mt-2">
              <div className="flex flex-wrap space-x-2 items-center ml-[5px]">
                <div className="rounded-[50%] bg-green-700 w-[10px] h-[10px]"></div>
                <div className="text-[15px] font-[500]">
                  <span className="placeholder w-[50%] md:w-[70%] lg:w-[40%]"></span>
                </div>
              </div>
              <div className="relatve block mr-[15px] ml-auto">
                <span className="text-[17px] font-[400] text-zinc-950">
                  <span className="placeholder w-[50%] md:w-[70%] lg:w-[40%]"></span>
                </span>
              </div>
            </div>
            <div className="flex flex-wrap p-0 m-0">
              <div className="w-[80px] h-[82px] min-w-[82px] ml-[10px] flex flex-col items-center justify-center">
                <span className=" animate-pulse h-[95%] w-[95%] m-auto mt-4  text-start">
                  <span className="placeholder h-[100%] w-[97%] m-auto"></span>
                </span>
              </div>
              <div className="flex flex-col flex-wrap ml-[20px] items-start justify-center">
                <span className="text-[15px] font-[450] text-stone-900">
                  <span className="placeholder w-[50%] md:w-[70%] lg:w-[40%]"></span>
                </span>
                <span className="inline-flex items-start w-[100%]  ">
                  <span className="text-[13px] font-[450] text-stone-800 bg-slate-100 p-1 pl-0">
                    <span className="placeholder w-[50%] md:w-[70%] lg:w-[40%]"></span>
                  </span>
                </span>
              </div>
            </div>
            <div className="ml-[110px] flex flex-col flex-wrap m-0 pb-[10px]">
              <span className="text-[15px] font-[450] text-stone-900">
                <span className="placeholder w-[50%] md:w-[70%] lg:w-[40%]"></span>
              </span>
              <div className="flex flex-wrap space-x-2 items-center">
                <div className="rounded-[50%] bg-green-700 w-[7px] h-[7px]"></div>
                <div className="text-[15px] font-[500]">
                  {" "}
                  <span className="placeholder w-[50%] md:w-[70%] lg:w-[40%]"></span>
                </div>
              </div>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default ListOrderLoader;
