import React from "react";
import FontIcon from "./fontIcon";
import ServiceName from "./serviceName";
import ContactAddress from "./address";
import { services } from "../../../../Data";
const Footer = () => {
  return (
    <div className="footerLayout container bg-gray-50  mx-auto ">
      <div className="flex container mx-auto my-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className=" flex flex-col flex-wrap my-4 ">
            <span className="mx-4 p-2 flex flex-col flex-wrap items-start justify-center">
              <span className="text-[30px] font-medium ">PancharDokan</span>
              <span className="text-[18px] font-normal my-3">
                24/7 roadside assistance service provider for bikes & cars
                across india
              </span>
            </span>
            <div className="flex flex-wrap w-[100%] h-auto">
              <FontIcon />
            </div>
          </div>
          <div className="flex flex-col flex-wrap  h-auto relative cursor-pointer">
            <span className="text-[30px] font-semibold ml-2 md:ml-3 lg:ml-5 mb-1 mt-4 ">
              Services
            </span>
            <ul className=" flex list-none  justify-center flex-col ml-2 md:ml-3 lg:ml-5">
              {services.map((service, index) => (
                <ServiceName name={service.name} key={index} />
              ))}
            </ul>
          </div>
          <ContactAddress />
        </div>
      </div>
    </div>
  );
};

export default Footer;
