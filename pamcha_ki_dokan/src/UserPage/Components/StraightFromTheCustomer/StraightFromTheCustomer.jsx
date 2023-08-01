import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Review from "./Review";
import { useHttpClient } from "../../../Hooks/http-hook";
import ReviewLoader from "./reviewLoader";
import ErrorModule from "../../../ErrorModule/ErrorModule";
import { toast } from "react-toastify";
const StraightFromTheCustomer = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [reviews, setReviews] = useState([]);
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_HOME}review`
        );
        const { success, message, revi } = responseData;
        if (success) {
          setReviews(revi);
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
    nav: false,
    animateIn: "bounceInRight",
    animateOut: "bounceOutRight",
    dots: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  };
  return (
    <>
      {!isLoading && reviews.length > 0 && (
        <div className="mainContainer bg-gray-100 shadow box-border mt-[2rem] w-[97%] m-auto">
          <div className="flex flex-col flex-wrap overflow-hidden">
            <div className="mt-[2rem] flex flex-col ml-[1rem] mb-2 flex-wrap items-center justify-center">
              <span className="text-black text-[1.5rem] font-bold italic font-serif leading-3">
                Customer Reviews
              </span>
              <span className="bg-[#f9c935] w-[100px] h-[4px]  mx-auto mt-3 "></span>
            </div>
            <div className="container mx-auto ">
              <div className=" h-[100%] mx-auto w-[90%]  md:w-[80%] ">
                <div className=" md:mx-2  md:p-1 flex flex-wap relatve bg-inherit mt-3 mb-[4rem]">
                  <OwlCarousel className="owl-carousel" {...options}>
                    {reviews.map((review, index) => (
                      <Review
                        name={review.name}
                        aboutService={review.body}
                        image={review.image}
                        userType={review.userType}
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
        <div className="mainContainer bg-gray-100 shadow box-border mt-[2rem] w-[97%] m-auto">
          <div className="flex flex-col flex-wrap overflow-hidden w-[100%]">
            <div className="mt-[2rem] flex flex-col ml-[1rem] mb-2 flex-wrap items-center justify-center w-[80%]">
              <span className="text-black text-[1.5rem] font-bold italic font-serif leading-3 w-[80%] text-center">
                <span className="placeholder w-[80%] md:w-[70%] lg:w-[60%]"></span>
              </span>
            </div>
            <div className="container mx-auto ">
              <div className=" h-[100%] mx-auto w-[90%]  md:w-[80%] ">
                <div className=" md:mx-2  md:p-1 flex flex-wap relatve bg-inherit mt-3 mb-[4rem]">
                  <OwlCarousel className="owl-carousel" {...options}>
                    <ReviewLoader />
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StraightFromTheCustomer;
