import React, { useEffect, useRef, useState } from "react";
import Timmer from "./timmer.jsx";
import ButtonForm from "./../../../UI/buttonForm";
const OrderPop = (props) => {
  const Ref = useRef(null);
  const [timer, setTimer] = useState("-00");
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    return {
      total,
      seconds,
    };
  };
  const startTimer = (e) => {
    let { total, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(seconds > 9 ? seconds : "0" + seconds);
    }
  };
  const clearTimer = (e) => {
    setTimer("15");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };
  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 15);
    return deadline;
  };
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);
  // if (timer === "00") {
  //   console.log(timer);
  //   props.rejectOrder();
  // }
  return (
    <div className="container mx-auto z-[9999999999999999]">
      <div className="flex flex-col justify-center p-5 relative">
        <div className="flex justify-center">
          <Timmer timer={timer} />
        </div>
        <div className="bg-white flex hover:bg-green-100 w-[100%]">
          <div className="w-[80px] h-[82px] min-w-[82px] ml-[10px] flex flex-col items-center justify-center">
            <img
              src={props.image}
              alt="Loading.."
              className="max-h-[95%] max-w-[95%] m-auto"
            />
          </div>
          <div className="flex flex-col flex-wrap ml-[20px] items-start justify-center">
            <span className="text-[16px] font-[450] text-stone-900">
              {props.servicename}
            </span>
          </div>
        </div>
        <div className="bg-white p-2 hover:bg-green-100 w-[100%] space-x-3 flex items-center">
          <span className="text-[25px] ml-[0.5rem]">
            <i class="fa fa-location-arrow" aria-hidden="true"></i>
          </span>
          <span className="text-[19px] font-[400] text-zinc-700">
            {props.address}
          </span>
        </div>
        <div className="flex space-x-7 mt-[1rem]">
          <ButtonForm
            onClick={props.acceptOrder}
            type="button"
            buttonContent="Accept"
            className="text-[20px] w-full text-white bg-green-700 hover:green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          />
          <ButtonForm
            onClick={props.rejectOrder}
            type="button"
            buttonContent="Skip"
            className="text-[20px] w-full text-white bg-red-700 hover:red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderPop;
