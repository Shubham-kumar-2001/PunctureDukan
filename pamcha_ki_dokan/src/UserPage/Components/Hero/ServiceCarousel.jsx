import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Carousel from "nuka-carousel";
import { useHttpClient } from "../../../Hooks/http-hook";
import ErrorModule from "../../../ErrorModule/ErrorModule";
const ServiceCarousel = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_HOME}carousel`
        );
        setSlides(responseData);
      } catch (err) {}
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
      {<ErrorModule error={error} onClick={clearError} />}
      <div className="mt-[4rem] relative flex mx-auto ">
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
            <div
              className="border-solid border-2 border-white h-[100%] rounded-xl overflow-hidden
              w-[97%] m-auto"
            >
              <img src={slide.image} alt="serviceImage" />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
  return ReactDOM.createPortal(
    NukaCarousel,
    document.getElementById("carousel")
  );
};

export default ServiceCarousel;
