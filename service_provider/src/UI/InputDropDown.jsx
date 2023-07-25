import React from "react";
import { services } from "../Data";
const InputDropDown = (props) => {
  return (
    <div className="w-[95%] mx-auto overflow-hidden">
      <select
        className={`block px-2.5 pb-3 pt-4 w-[100%] text-[17px] font-semibold text-gray-900 bg-transparent rounded-lg border-[2px]   ${
          props.error
            ? "focus:border-red-600  border-red-600 dark:border-red-500 dark:focus:border-red-500"
            : "focus:border-green-600 dark:focus:border-green-500 border-blue-600 dark:border-blue-500"
        }  appearance-none dark:text-white focus:outline-none focus:ring-0 peer`}
        name="service"
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.disabled}
      >
        <option selected value=" ">
          Choose a Service
        </option>
        {services.map((service, index) => (
          <option value={`${service.name}`}>{service.name}</option>
        ))}
      </select>
    </div>
  );
};

export default InputDropDown;
