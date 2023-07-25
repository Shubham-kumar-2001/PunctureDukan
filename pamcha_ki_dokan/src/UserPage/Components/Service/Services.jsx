import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../../Hooks/http-hook";
import ErrorModule from "../../../ErrorModule/ErrorModule";
import HeroService from "../Hero/HeroService";
import HeroLoaderService from "../Hero/HeroServiceLoader";
const Services = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_HOME}services`
        );
        setServices(responseData);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);
  return (
    <>
      {<ErrorModule error={error} onClick={clearError} />}
      {!isLoading && services.length > 0 && (
        <div className="flex h-auto items-start justify-center  mt-[6rem]">
          <div class="container flex mx-auto flex-col">
            <div className="flex flex-warp items-center justify-center bg-[#efefef]">
              <span className="text-[2rem] font-bold"> Services</span>
            </div>
            <div class="flex flex-wrap overflow-hidden items-center ">
              <div class="flex flex-wrap w-[100%] space-x-4 items-center justify-center">
                {services.map((service, index) => (
                  <div className="w-[95%] md:w-[45%] lg:w-[30%] mt-[10px]  my-5 ">
                    <HeroService
                      image={service.image}
                      name={service.name}
                      price={service.price}
                      aboutServices={service.aboutServices}
                      key={index}
                      service_id={service._id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex h-auto items-start justify-center  mt-[6rem]">
          <div class="container flex mx-auto flex-col">
            <div className="flex flex-warp items-center justify-center bg-[#efefef] w-[100%]">
              <span className="text-[2rem] font-bold animate-pulse w-[100%] text-center">
                <span className="placeholder w-[80%] md:w-[70%] lg:w-[40%]"></span>
              </span>
            </div>
            <div class="flex flex-wrap overflow-hidden items-center ">
              <div class="flex flex-wrap w-[100%] space-x-4 items-center justify-center">
                {Array.from({ length: 6 }, (_, i) => (
                  <div className="w-[95%] md:w-[45%] lg:w-[30%] mt-[10px]  my-5 ">
                    <HeroLoaderService key={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
