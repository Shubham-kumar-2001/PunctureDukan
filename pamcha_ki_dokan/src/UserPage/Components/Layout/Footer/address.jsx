import React  from "react";
import List from "./List";
const ContactAddress = (props) => {
  return (
    <div className="flex flex-col flex-wrap  h-auto relative cursor-pointer w-[100%] ">
      <div className="flex flex-wrap items-start justify-center ml-2 md:ml-3 lg:ml-5 mb-1 mt-4">
        <span class="flex-1 ml-1 text-[20px] font-semibold">
          {props.address}
        </span>
      </div>
      <div className="flex flex-wrap items-start justify-center flex-col ml-2 md:ml-3 lg:ml-5 mb-1 mt-4">
        <span className="text-[20px] font-medium">{props.link}</span>
        <ul className="mt-2 flex flex-col space-y-1">
          {props.links.map((help, index) => (
            <List name={help.name} fabIcon={help.fabIcon} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactAddress;
