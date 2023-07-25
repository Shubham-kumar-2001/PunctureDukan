import React, { useEffect, useState } from "react";
import List from "./list";
import ListLoader from "./listLoader";
import { useHttpClient } from "../../../Hooks/http-hook";
import ErrorModule from "../../../ErrorModule/ErrorModule";
const WhatInIt = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [whatInIt, setWhatInIt] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_HOME}whatinit`
        );
        setWhatInIt(responseData);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);
  return (
    <>
      {<ErrorModule error={error} onClick={clearError} />}
      {!isLoading && whatInIt.length > 0 && (
        <div className="container card mx-auto mt-[2rem] rounded-b-[25px]">
          <div className="block h-[100%] container p-8 mx-auto"></div>
          <div className="flex flex-wrap flex-col mx-auto relative bg-inherit items-center justify-center">
            <div className="flex flex-warp items-center justify-center relative flex-col">
              <span className="text-[#000000] text-[30px] font-semibold font-serif relative leading-4">
                What's in it for you
              </span>
              <span className="bg-[#f9c935] w-[60px] h-[4px]  mx-auto mt-3 "></span>
            </div>
            <div className="flex flex-warp w-[100%]">
              <div className="m-6 p-3 w-[100%]">
                <ul className="flex  flex-col md:flex-row flex-warp justify-center items-center relative">
                  {whatInIt.map((data, index) => (
                    <List
                      image={data.image}
                      title={data.title}
                      subTitle={data.subTitle}
                      key={index}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="container card mx-auto mt-[2rem] rounded-b-[25px]">
          <div className="block h-[100%] container p-8 mx-auto w-[100%]"></div>
          <div className="flex flex-wrap flex-col mx-auto relative bg-inherit items-center justify-center w-[100%]">
            <div className="flex flex-warp items-center justify-center relative flex-col w-[80%] mx-auto">
              <span className="text-[#000000] text-[30px] font-semibold font-serif relative leading-4 w-[80%] text-center">
                <span className="placeholder w-[80%] md:w-[70%] lg:w-[60%]"></span>
              </span>
            </div>
            <div className="flex flex-warp w-[100%]">
              <div className="m-6 p-3 w-[100%] ">
                <ul className="flex flex-col md:flex-row flex-warp justify-center items-center w-[100%]">
                  {Array.from({ length: 3 }, (_, i) => (
                    <ListLoader key={i} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatInIt;
