import React from "react";
import ButtonForm from "../../../../UI/buttonForm";

const BookServiceLoading = () => {
  return (
    <>
      <div className="container ">
        <div className="flex animate-pulse flex-wrap mx-auto flex-col w-[99%] sm:w-[95%] sm:mx-auto md:w-[85%]">
          <div class="flex animate-pulse items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
            <svg
              class="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div
            className="z-40 w-[100%]  flex flex-col mx-auto
          flex-wrap justify-center items-start card shadow 
           rounded border-[1]"
          >
            <div className="flex flex-col w-[100%] justify-center my-[1rem] items-start  space-y-2">
              <div className="bg-white p-2 hover:bg-green-100 w-[100%] space-x-3 flex items-center">
                <span className="text-[25px] ml-[0.5rem] w-[25px] animate-pulse">
                  <span className="placeholder w-[100%] md:w-[70%] lg:w-[40%]"></span>
                </span>
                <span className="text-[2rem] font-bold animate-pulse w-[100%] text-start">
                  <span className="placeholder w-[80%] md:w-[70%] lg:w-[40%]"></span>
                </span>
              </div>
              <div className="bg-white flex hover:bg-green-100 w-[100%]">
                <div className="w-[80px] h-[82px] min-w-[82px] ml-[10px] flex flex-col items-center justify-center">
                  <span className=" animate-pulse h-[95%] w-[95%] m-auto mt-4  text-start">
                    <span className="placeholder h-[100%] w-[97%] m-auto"></span>
                  </span>
                </div>
                <div className="flex flex-col flex-wrap ml-[20px] items-start justify-center w-[100%]">
                  <span className="text-[2rem] font-bold animate-pulse w-[100%] text-start">
                    <span className="placeholder w-[50%] md:w-[70%] lg:w-[40%]"></span>
                  </span>

                  <span className="inline-flex items-start w-[100%]  ">
                    <span className="text-[2rem] font-bold animate-pulse w-[100%] text-start">
                      <span className="placeholder w-[40%]"></span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[90%] flex  justify-center mx-auto">
              <ButtonForm
                type="submit"
                buttonContent={
                  <span className="animate-pulse w-[100%] text-[20px] ">
                    <span className="placeholder w-[50%] md:w-[70%] lg:w-[40%]"></span>
                  </span>
                }
                className=" w-[70%]  mb-[1rem] placeholder rounded font-semibold"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookServiceLoading;