import React from "react";
const ContactAddress = () => {
  return (
    <div className="flex flex-col flex-wrap  h-auto relative cursor-pointer w-[100%] ">
      <div className="flex flex-wrap items-start justify-center ml-2 md:ml-3 lg:ml-5 mb-1 mt-4">
        <span className="text-[20px] font-semibold">
          IIT Bhgalpur Sabour Bhagalpur Near BCE campue
        </span>
      </div>
      <div className="flex flex-wrap items-start justify-center flex-col ml-2 md:ml-3 lg:ml-5 mb-1 mt-4">
        <span className="text-[20px] font-medium">Links</span>
        <ul className="mt-2 flex flex-col space-y-1">
          <li className="text-[17px] font-normal">Career</li>
          <li className="text-[17px] font-normal">Contact Us</li>
          <li className="text-[17px] font-normal">Terms & Condations</li>
          <li className="text-[17px] font-normal">Priyacy Policy</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactAddress;
