import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useHttpClient } from "../../../Hooks/http-hook";
import AboutServiceLoading from "./AboutServiceLoading";

const AboutService = () => {
  const [about, setAbout] = useState([{}]);
  const { isLoading, error, sendRequest } = useHttpClient();
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "https://puncturedukan.onrender.com/api/puncturedukan/about"
        );
        const { success, message, about } = responseData;
        console.log(about);
        if (success) {
          setAbout(about);
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
      {isLoading && <AboutServiceLoading />}
      {!isLoading && (
        <div className=" container flex flex-wrap h-auto bg-inherit mx-auto">
          <div className="block h-[100%] container p-8 mx-auto"></div>
          <div className=" flex flex-wrap items-start justify-center">
            <div className="lg:grid lg:grid-cols-2 md:gap-4">
              <div className="flex flex-col mx-2">
                <div className="flex relative items-start justify-center flex-wrap">
                  <span className="text-[28px] font-semibold font-serif">
                    {about[0].title}
                  </span>
                </div>
                <div className="flex flex-wrap relative p-1 my-2">
                  <span className="text-[17px] font-normal font-sans">
                    {about[0].description}
                  </span>
                </div>
                <div className="flex flex-wrap relative p-1 my-2">
                  <span className="text-[17px] font-normal font-sans">
                    {about[0].belive}
                  </span>
                </div>
              </div>
              <div className=" flex flex-wrap w-[100%] h-[100%] m-auto mt-3 lg:mt-5 container">
                <div className=" flex items-center justify-center mx-auto overflow-hidden rounded-s-full">
                  <img
                    className=" rounded-r-xl"
                    src={about[0].image}
                    alt="loading"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutService;
