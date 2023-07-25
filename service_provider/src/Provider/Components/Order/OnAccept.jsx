import React from "react";
import ButtonForm from "../../../UI/buttonForm";
import { Link } from "react-router-dom";
const OnAcceptOrder = (props) => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center p-5 relative">
        <div className="flex ">
          <ButtonForm
            onClick={props.acceptOrder}
            type="button"
            buttonContent={
              <Link
                to={`http://maps.google.com/maps?q=${props.longitude},${props.latitude}`}
              >
                Go to user location
              </Link>
            }
            className="text-sm w-full text-white bg-green-700 hover:green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          />
        </div>
        <div className="flex justify-center flex-col mt-2">
          <span className="text-[20px] font-semibold">{props.name}</span>
          <span className="text-[19px] font-normal">{props.mobilenumber}</span>
        </div>
        <div className="flex justify-center flex-col mt-2">
          <span className="text-[19px] font-normal">
            Distance:-{props.distance}
          </span>
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
        <div className="flex space-x-7 mt-[1rem]">
          <ButtonForm
            onClick={props.acceptOrder}
            type="button"
            buttonContent="Arrive"
            className="text-[20px] w-full text-white bg-green-700 hover:green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          />
        </div>
      </div>
    </div>
  );
};

export default OnAcceptOrder;
