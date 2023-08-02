import React, { useEffect, useState } from "react";
import WhenEverGrid from "./WhenEverGrid";
import WhenEverGridLoader from "./WhenEverGridLoading";
import WhenEverHeadingLoader from "./WhenEverGridLoader";
import { useHttpClient } from "../../../Hooks/http-hook";
import ErrorModule from "../../../ErrorModule/ErrorModule";
import { toast } from "react-toastify";
const WhenEverWhereEver = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [whenEverData, setWhenEverData] = useState([]);
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `https://puncturedukan.onrender.com/api/puncturedukan/whenever&whereever`
        );
        const { success, message, whenEver } = responseData;
        if (success) {
          setWhenEverData(whenEver);
        } else {
          handleError(message);
        }
      } catch (err) {
        handleError(error);
      }
    };
    fetchUsers();
  }, [sendRequest]);
  return (
    <>
      {<ErrorModule error={error} onClick={clearError} />}
      {!isLoading && whenEverData.length > 0 && (
        <div className="container h-auto mx-auto mt-5">
          <div className="block h-[100%] container p-8 mx-auto"></div>
          <div className="flex flex-col flex-wrap h-[100%] md:mx-[10%] mx-auto ">
            <div className="flex flex-col flex-wrap items-start md:items-center  justify-center m-auto py-4">
              {" "}
              <span className=" text-[26px] md:text-[28px] font-semibold py-2 md:mx-auto ml-3 ">
                WhenEver & WhereEver
              </span>
              <span className=" text-[18px] font-medium mx-auto text-gray-900 ml-3 md:ml-0">
                {" "}
                We've got you covered wherever you go across country!
              </span>
            </div>
            <div className="flex flex-wrap h-auto ">
              <div>
                <div className="grid grid-cols-1  lg:grid-cols-2">
                  {whenEverData.map((promiseData, index) => (
                    <WhenEverGrid
                      image={promiseData.image}
                      title={promiseData.title}
                      subTitle={promiseData.subTitle}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="container h-auto mx-auto mt-5">
          <div className="block h-[100%] container p-8 mx-auto"></div>
          <div className="flex flex-col flex-wrap h-[100%] md:mx-[10%] mx-auto ">
            <WhenEverHeadingLoader />
            <div className="flex flex-wrap h-auto ">
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }, (_, i) => (
                    <WhenEverGridLoader key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhenEverWhereEver;
