import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Carousel from "nuka-carousel";
import { useHttpClient } from "../../../Hooks/http-hook";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ButtonForm from "../../../UI/buttonForm";
const ServiceCarousel = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [slides, setSlides] = useState([]);
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `https://puncturedukan.onrender.com/api/puncturedukan/services`
        );
        const { success, message,service  } = responseData;
        if (success) {
          setSlides(service);
        } else {
          handleError(message);
        }
      } catch (err) {
        handleError(err.message);
      }
    };
    fetchUsers();
  }, [sendRequest]);
  const params = {
    adaptiveHeight: "true",
    wrapAround: "true",
    autoplay: "true",
    DefaultControlsConfig: {
      containerClassName: "containerClassName",
    },
  };
  const NukaCarousel = (
    <>
      <div className="mt-[4rem] relative flex mx-auto">
        {isLoading && (
          <Carousel
            {...params}
            renderCenterLeftControls={({ previousSlide }) => (
              <button
                onClick={previousSlide}
                className="border-solid hidden  border-white rounded-r-xl border-l-white pl-3 pr-3 pt-6 pb-6  md:ml-5 border-2 bg-white"
              >
                <i
                  className="fa fa-chevron-left font-medium"
                  aria-hidden="true"
                ></i>
              </button>
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <button
                onClick={nextSlide}
                className="border-solid hidden  border-white rounded-l-xl border-l-white pl-3 pr-3 pt-6 pb-6 md:mr-5 border-2 bg-white"
              >
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
              </button>
            )}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <div
                className="h-[100%] rounded-xl overflow-hidden animate-pulse cursor-wait
               w-[97%] m-auto"
              >
                <div className="animate-pulse h-[90%] overflow-hidden dark:bg-gray-600 w-[97%] bg-gray-500 m-auto rounded-lg">
                  <svg
                    class="w-[100%] h-[100%] text-gray-700 dark:text-gray-600 animate-pulse"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
              </div>
            ))}
          </Carousel>
        )}
        {!isLoading && (
          <Carousel
            {...params}
            renderCenterLeftControls={({ previousSlide }) => (
              <button
                onClick={previousSlide}
                className="border-solid hidden md:block border-white rounded-r-xl border-l-white pl-3 pr-3 pt-6 pb-6  md:ml-5 border-2 bg-white"
              >
                <i
                  className="fa fa-chevron-left font-medium"
                  aria-hidden="true"
                ></i>
              </button>
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <button
                onClick={nextSlide}
                className="border-solid hidden md:block border-white rounded-l-xl border-l-white pl-3 pr-3 pt-6 pb-6 md:mr-5 border-2 bg-white"
              >
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
              </button>
            )}
          >
            {slides.map((slide, index) => (
              <Link
                className="border-solid border-2 border-white h-[100%] rounded-xl 
              w-[97%] m-auto grid grid-cols-1 bg-white items-start overflow-hidden shadow  sm:grid-cols-2 gap-4 
               hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div
                  className={`flex h-[90%] m-auto w-[97%] sm:w-[90%] items-star ${
                    index % 2 === 0 ? "order-last" : ""
                  }`}
                >
                  <img
                    src={slide.image}
                    alt="serviceimage"
                    className="h-[100%] w-[100%]  rounded sm:rounded-[3rem] m-auto"
                    key={index}
                  />
                </div>
                <div className=" p-4 space-y-2 items-center my-auto justify-center flex flex-col">
                  <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    24/7
                  </span>
                  <span className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {slide.servicename}
                  </span>
                  <dir className="font-normal text-base tracking-tight text-gray-700 dark:text-white">
                    Book service For all Vechile
                  </dir>
                  <ButtonForm
                    type="submit"
                    buttonContent={
                      <Link to={`/puncturedukan/service/${slide.servicename}`}>
                        Book Service Now
                      </Link>
                    }
                    className={`text-[20px] w-[90%] sm:w-[70%] md:w-[40%] text-white bg-gray-700 hover:gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-[3rem] text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800
                       `}
                  />
                </div>
              </Link>
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
  return ReactDOM.createPortal(
    NukaCarousel,
    document.getElementById("carousel")
  );
};

export default ServiceCarousel;
