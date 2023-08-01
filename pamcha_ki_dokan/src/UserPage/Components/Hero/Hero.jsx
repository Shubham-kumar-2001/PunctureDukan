import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./HeroService.css";
import { Link } from "react-router-dom";
import HeroService from "./HeroService";
import HeroLoaderService from "./HeroServiceLoader";
import { useHttpClient } from "../../../Hooks/http-hook";
import ErrorModule from "./../../../ErrorModule/ErrorModule";
import { toast } from "react-toastify";
const Hero = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [services, setServices] = useState([]);
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_HOME}services`
        );
        const { success, message, service } = responseData;
        if (success) {
          setServices(service);
        } else {
          handleError(message);
        }
      } catch (err) {
        handleError(error);
      }
    };
    fetchUsers();
  }, [sendRequest]);
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    animateIn: "bounceInRight",
    animateOut: "bounceOutRight",
    dots: false,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1000: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  };
  return (
    <React.Fragment>
      {!isLoading && services.length > 0 && (
        <div className="mainContainer bg-gray-100 shadow box-border w-[97%] m-auto">
          <div className="flex flex-col flex-wrap overflow-hidden">
            <div className="mt-[2rem] flex items-start md:ml-[1rem] flex-wrap mb-3 justify-center">
              <span className="text-black text-[1.1rem] md:text-[2rem] font-bold italic font-serif">
                These are the services
              </span>
              <div className="flex ml-auto mr-2">
                <Link to="/puncturedukan/services" className="">
                  <button
                    className=" mr-2 md:mr-0 border-none text-[16px] text-[#fff] py-[8px] px-[16px] rounded-[6px]
                  cursor-pointer transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1
                  hover:scale-110 hover:bg-indigo-500 duration-300"
                  >
                    view More
                  </button>
                </Link>
              </div>
            </div>
            <hr></hr>
            <div className="mainContainer container mx-auto">
              <div className=" h-[100%] ">
                <div className=" my-4 p-0 flex flex-wap relatve mx-1">
                  <OwlCarousel className="owl-carousel" {...options}>
                    {services.map((service, index) => (
                      <HeroService
                        image={service.image}
                        name={service.servicename}
                        price={service.price}
                        aboutServices={service.aboutServices}
                        service_id={service._id}
                        key={index}
                      />
                    ))}
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="mainContainer bg-gray-100 shadow box-border  w-[97%] m-auto">
          <div className="flex flex-col flex-wrap overflow-hidden">
            <div className="mt-[2rem] flex items-start md:ml-[1rem] flex-wrap mb-3 justify-center">
              <div class="h-2 bg-slate-200 rounded w-[50%]"></div>
              <div className="flex ml-auto mr-2">
                <div class="h-[20px] bg-slate-200 rounded w-[100px]"></div>
              </div>
            </div>
            <hr></hr>
            <div className="mainContainer container mx-auto">
              <div className=" h-[100%] ">
                <div className=" my-4 p-0 flex flex-wap relatve mx-1">
                  <OwlCarousel className="owl-carousel" {...options}>
                    <HeroLoaderService />
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Hero;
