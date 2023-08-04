import React, { useState } from "react";
import useWindowDimensions from "../../../GetWindowHeightAndWidth/Height&width";
import axios from "axios";

const ListOrder = (props) => {
  const { width } = useWindowDimensions();
  const [useraddress, setUserAddress] = useState([]);
  const [provideraddress, setProviderAddress] = useState([]);
  axios
    .get(
      `${process.env.REACT_APP_ADDRESS}${props.userlati},${props.userlongi}.json?access_token=${process.env.REACT_APP_MAPBOX}`
    )
    .then((user) => {
      setUserAddress(user.data.features[0].place_name);
    });

  axios
    .get(
      `${process.env.REACT_APP_ADDRESS}${props.providerlati},${props.providerlongi}.json?access_token=${process.env.REACT_APP_MAPBOX}`
    )
    .then((provider) => {
      setProviderAddress(provider.data.features[0].place_name);
    });

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
                      Served By : {props.providername}
                    </span>
                  </span>
                </div>
              </div>
              <div className="ml-[15px] flex flex-col flex-wrap my-auto py-[10px] justify-center sm:ml-auto">
                <div className="flex flex-wrap space-x-2 items-center">
                  <div className="rounded-[50%] bg-green-700 w-[7px] h-[7px]"></div>
                  <div className="text-[15px] font-[500]">{useraddress}</div>
                </div>
                <span className="w-[1.5px] h-6 bg-gray-700 ml-[1px] p-0"></span>
                <div className="flex flex-wrap space-x-2 items-center">
                  <div className="rounded-[50%] bg-green-700 w-[7px] h-[7px]"></div>
                  <div className="text-[15px] font-[500]">
                    {provideraddress}
                  </div>
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
                <div className="text-[15px] font-[500]">{props.status}</div>
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
                <div className="text-[15px] font-[500]">{props.status}</div>
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
                    Served By : {props.providername}
                  </span>
                </span>
              </div>
            </div>
            <div className="ml-[15px] flex flex-col flex-wrap m-0 pb-[10px]">
              <div className="flex flex-wrap space-x-2 items-center">
                <div className="rounded-[50%] bg-green-700 w-[7px] h-[7px]"></div>
                <div className="text-[15px] font-[500]">{useraddress}</div>
              </div>
              <span className="w-[1.5px] h-6 bg-gray-700 ml-[1px] p-0"></span>
              <div className="flex flex-wrap space-x-2 items-center">
                <div className="rounded-[50%] bg-green-700 w-[7px] h-[7px]"></div>
                <div className="text-[15px] font-[500]">{provideraddress}</div>
              </div>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default ListOrder;
