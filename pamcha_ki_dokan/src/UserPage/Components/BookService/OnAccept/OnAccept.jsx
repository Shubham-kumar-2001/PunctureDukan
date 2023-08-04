import React from "react";
import ButtonForm from "../../../../UI/buttonForm";
const OnAcceptOrder = (props) => {
  return (
    <div className="flex flex-col justify-center mt-[1rem] p-2 relative">
      <div className="flex justify-center flex-col mt-2">
        <span className="text-[20px] font-semibold">{props.name}</span>
        <span className="text-[19px] font-normal">{props.mobilenumber}</span>
      </div>
      <div className="flex justify-center flex-col mt-2">
        <span className="text-[19px] font-normal">
          Distance:-
          {props.distance < 1000
            ? `${parseInt(props.distance)}meter`
            : `${parseInt(props.distance) / 1000}km`}
        </span>
      </div>
      <div className="flex justify-center flex-col mt-2">
        <span className="text-[22px] font-bols">OTP :-{props.otp}</span>
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
          <span className="text-[17px] font-[500] text-stone-900">
            {props.servicename}
          </span>
          <span className="text-[17px] font-[500] text-stone-900">
            ₹{props.price}/service
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
      <div className="w-[100%] flex  justify-center mx-auto">
        <ButtonForm
          onClick={props.onClick}
          type="submit"
          buttonContent="Payments Done"
          className="btn-primary text-[17px] w-[70%] py-[.7rem] px-[2.6rem]  cursor-pointer mb-[1rem]"
        />
      </div>
    </div>
  );
};

export default OnAcceptOrder;
