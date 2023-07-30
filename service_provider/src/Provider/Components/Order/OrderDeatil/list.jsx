import React from "react";
import useWindowDimensions from "../../../../GetWindowHeightAndWidth/Height&width";
const ListOrder = (props) => {
  const { width } = useWindowDimensions();
  return (
    <>
      {width >= 500 && (
        <li className="card container shadow rounded border-[1]">
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-3 flex flex-wrap">
              <div className="flex flex-wrap p-0 m-0">
                <div className="w-[80px] h-[80px] min-w-[80px] ml-[10px] flex flex-col items-center justify-center">
                  <img
                    src={props.image}
                    alt="Loading.."
                    className="max-h-[90%] max-w-[90%] m-auto"
                  />
                </div>
                <div className="flex flex-col flex-wrap ml-[20px] items-start justify-center">
                  <span className="text-[15px] font-[450] text-stone-900">
                    {props.serviceName}
                  </span>
                  <span className="inline-flex items-start w-[100%]  ">
                    <span className="text-[13px] font-[450] text-stone-800 bg-slate-100 p-1 pl-0">
                      Served By : {props.name}
                    </span>
                  </span>
                </div>
              </div>
              <div className="ml-[110px] flex flex-col flex-wrap m-0 pb-[10px] justify-center sm:ml-auto">
                <span className="text-[15px] font-[450] text-stone-900">
                  Service Location
                </span>
                <div className="flex flex-wrap space-x-2 items-center">
                  <div className="rounded-[50%] bg-green-700 w-[7px] h-[7px]"></div>
                  <div className="text-[15px] font-[500]">Mobarakpur</div>
                </div>
              </div>
            </div>
            <div className="relatve  mr-[15px]  flex items-center ml-auto">
              <span className="text-[17px] font-[400] text-zinc-950">
                ₹{props.price}
              </span>
            </div>
            <div className="col-span-2 flex justify-center items-center">
              <div className="flex flex-wrap space-x-2 items-center ml-[5px]">
                <div className="rounded-[50%] bg-green-700 w-[10px] h-[10px]"></div>
                <div className="text-[15px] font-[500]">Service provided</div>
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
                <div className="text-[15px] font-[500]">Delevered</div>
              </div>
              <div className="relatve block mr-[15px] ml-auto">
                <span className="text-[17px] font-[400] text-zinc-950">
                  ₹{props.price}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap p-0 m-0">
              <div className="w-[80px] h-[80px] min-w-[80px] ml-[10px] flex flex-col items-center justify-center">
                <img
                  src={props.image}
                  alt="Loading.."
                  className="max-h-[90%] max-w-[90%] m-auto"
                />
              </div>
              <div className="flex flex-col flex-wrap ml-[20px] items-start justify-center">
                <span className="text-[15px] font-[450] text-stone-900">
                  {props.serviceName}
                </span>
                <span className="inline-flex items-start w-[100%]  ">
                  <span className="text-[13px] font-[450] text-stone-800 bg-slate-100 p-1 pl-0">
                    Served By : {props.name}
                  </span>
                </span>
              </div>
            </div>
            <div className="ml-[110px] flex flex-col flex-wrap m-0 pb-[10px]">
              <span className="text-[15px] font-[450] text-stone-900">
                Service Location
              </span>
              <div className="flex flex-wrap space-x-2 items-center">
                <div className="rounded-[50%] bg-green-700 w-[7px] h-[7px]"></div>
                <div className="text-[15px] font-[500]">Mobarakpur</div>
              </div>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default ListOrder;
