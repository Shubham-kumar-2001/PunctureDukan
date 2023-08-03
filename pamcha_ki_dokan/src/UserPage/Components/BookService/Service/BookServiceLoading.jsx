import React from "react";
import ButtonForm from "../../../../UI/buttonForm";
const BookServiceLoading = () => {
  return (
    <>
      <div className="container ">
        <div className="flex animate-pulse flex-wrap mx-auto flex-col w-[99%] sm:w-[95%] sm:mx-auto md:w-[85%] bg-gray-700">
          <div class="flex animate-pulse items-center justify-center w-[100%] h-[46%] rounded sm:w-96 dark:bg-gray-700 mx-auto">
            <svg
              viewBox="0 0 800 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="800" height="800" rx="4" fill="#374151" />
              <path
                d="M400 338.583C383.811 338.583 370.688 351.707 370.688 367.896C370.688 380.984 389.845 404.839 397.185 413.498C398.672 415.252 401.331 415.252 402.815 413.498C410.155 404.839 429.313 380.984 429.313 367.896C429.313 351.707 416.189 338.583 400 338.583ZM400 377.667C394.603 377.667 390.229 373.293 390.229 367.896C390.229 362.499 394.603 358.125 400 358.125C405.397 358.125 409.771 362.499 409.771 367.896C409.771 373.293 405.397 377.667 400 377.667ZM337.681 388.822C336.299 389.374 335.115 390.328 334.281 391.56C333.446 392.792 333 394.246 333 395.734V453.968C333 456.601 335.659 458.402 338.104 457.425L370.222 442.806V388.582C368.166 384.865 366.484 381.245 365.279 377.783L337.681 388.822ZM400 422.257C396.727 422.257 393.63 420.819 391.506 418.311C386.933 412.914 382.068 406.768 377.667 400.463V442.803L422.333 457.692V400.465C417.932 406.768 413.07 412.916 408.494 418.313C406.37 420.819 403.273 422.257 400 422.257ZM461.896 376.076L429.778 390.695V457.695L462.319 444.678C463.701 444.126 464.885 443.172 465.72 441.94C466.554 440.708 467 439.255 467 437.767V379.533C467 376.899 464.341 375.098 461.896 376.076Z"
                fill="#6B7280"
              />
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
