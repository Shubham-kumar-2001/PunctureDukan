import React from "react";
import ContactForm from "./ContactForm";
const ContactUs = () => {
  return (
    <div className="container mx-auto flex mt-[10rem]">
      <div className="flex w-[95%] mx-auto justify-center items-center flex-col lg:flex-row">
        <div className="flex flex-col flex-wrap justify-center my-5 lg:w-auto">
          <span className="flex flex-wrap flex-col items-center justify-center my-4 ml-2">
            <span className="text-[2rem] md:text-[3rem] font-bold leading-normal">
              Get in Touch with us here
            </span>
            <span className="text-[1.5rem] md:text-[2rem] font-normal leading-relaxed my-4">
              Get help for your queries here
            </span>
          </span>
          <div className="flex w-[100%] flex-wrap items-center flex-col">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
