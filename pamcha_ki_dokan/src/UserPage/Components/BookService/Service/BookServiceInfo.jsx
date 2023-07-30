import React from "react";
const BookServiceInfo = (props) => {
  return (
    <div className="flex flex-col w-[100%] justify-center my-[1rem] items-start  space-y-1">
      <div className="bg-white p-2 hover:bg-green-100 w-[100%] space-x-3 flex items-center">
        <span className="text-[25px] ml-[0.5rem]">
          <i class="fa fa-location-arrow" aria-hidden="true"></i>
        </span>
        <span className="text-[19px] font-[400] text-zinc-700">
          {props.address}
        </span>
      </div>
      <div className="bg-white flex hover:bg-green-100 w-[100%]">
        <div className="w-[80px] h-[82px] min-w-[82px] ml-[10px] flex flex-col items-center justify-center">
          <img
            src={props.image}
            alt="Loading.."
            className="max-h-[95%] max-w-[95%] m-auto "
          />
        </div>
        <div className="flex flex-col flex-wrap ml-[20px] items-start justify-center w-[100%]">
          <span className="text-[16px] font-[450] text-stone-900">
            {props.name}
          </span>

          <span className="inline-flex items-start w-[100%]  ">
            <span className="text-[15px] font-[450] text-stone-800 bg-slate-100 p-1 pl-0">
              ₹{props.price}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookServiceInfo;
