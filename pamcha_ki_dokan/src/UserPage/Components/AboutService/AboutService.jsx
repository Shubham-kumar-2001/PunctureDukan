import React from "react";
const AboutService = () => {
  return (
    <div className=" container flex flex-wrap h-auto bg-inherit mx-auto">
      <div className="block h-[100%] container p-8 mx-auto"></div>
      <div className=" flex flex-wrap items-start justify-center">
        <div className="lg:grid lg:grid-cols-2 md:gap-4">
          <div className="flex flex-col mx-2">
            <div className="flex relative items-start justify-center flex-wrap">
              <span className="text-[28px] font-semibold font-serif">
                Car & Bike Puncture Repair Service
              </span>
            </div>
            <div className="flex flex-wrap relative p-1 my-2">
              <span className="text-[17px] font-normal font-sans">
                {" "}
                Looking for Flat Tyre Puncture nearby? Flat tyre repair or
                puncture repair is a key service in any roadside assistance
                service. Flat tyres generally happen due to punctures on the
                tubes or tyres because of nail or some sharp objects piercing
                it, valve pin issues, valve neck problems, rim bend problem etc.
                Flat tyre also occurs due to long halt of the vehicles. In all
                such cases it is important to examine the tyre and provide the
                right fix which is needed. We at ReadyAssist are highly skilled
                and experienced in doing puncture repairs of both tube &
                tubeless tyres of bikes & cars with utmost care and
                professionalism.{" "}
              </span>
            </div>
            <div className="flex flex-wrap relative p-1 my-2">
              <span className="text-[17px] font-normal font-sans">
                {" "}
                Do not worry any more when you are stuck for doorstep car
                puncture repair, car puncture service, bike puncture repair,
                doorstep bike puncture service, car tyre repair, bike tyre
                repair, flat tyre puncture repair, etc; we will send an
                experienced puncture mechanic nearby you to help you faster.
              </span>
            </div>
          </div>
          <div className=" flex flex-wrap w-[100%] h-[100%] m-auto mt-3 lg:mt-5 container">
            <div className=" flex items-center justify-center mx-auto overflow-hidden rounded-s-full">
              <img
                className=" rounded-r-xl"
                src="https://readyassist.in/assets/images/services/car-tyre_onroad.jpg"
                alt="loading"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutService;
