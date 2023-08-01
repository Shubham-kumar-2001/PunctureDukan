import React from "react";
const List = (props) => {
  return (
    <li className=" flex items-center justify-center flex-col w-[100%] h-[auto] md:mx-[7px] lg:mx-[15px] mb-6 ">
      <div className="p-1 w-[190px] h-[100%] ">
        <img
          src={props.image}
          alt="loading"
          className="w-[100%] h-[100%] relative rounded-lg
    "
        />
      </div>
      <div className="flex my-4">
        <h3 className="text-[26px] md:text-[19px] from-neutral-200 font-semibold leading-4">
          {props.title}
        </h3>
      </div>
      <p className=" text-[16px]  font-neutral leading-5 flex items-start">
        {props.subTitle}
      </p>
    </li>
  );
};

export default List;
