import React from "react";
import TextInput from "../../../UI/InputForm";
import RadioInput from "../../../UI/RadioInput";
const UserDetail = (props) => {
  return (
    <div className="space-y-6 flex flex-col flex-wrap mb-[2rem] ">
      <button
        onClick={props.handleShowDetail}
        type="button"
        class="sm:!hidden text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-[9.4%] left-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
      <div className="flex flex-wrap items-center justify-center mt-[2rem] md:mt-0">
        <span className="text-[30px] font-semibold">Personal Information</span>

        <div className="grid gid-cols-1 lg:grid-cols-2 gap-4 w-[90%] mx-auto mt-[2rem]">
          <TextInput
            label="FirstName"
            input={{
              type: "text",
              name: "firstname",
              id: "firstname",
            }}
            defaultValue={props.userData.firstname}
            disabled="disabled"
            className="w-[100%] lg:w-[90%] my-[1rem]"
          />

          <TextInput
            label="LastName"
            input={{
              type: "text",
              name: "lastname",
              id: "lastname",
            }}
            defaultValue={props.userData.lastname}
            disabled="disabled"
            className="w-[100%] lg:w-[90%] my-[1rem]"
          />
        </div>
      </div>
      <div className="flex flex-col items-start ml-[2rem] space-y-4">
        <span className="block text-[23px] font-medium text-zinc-500">
          Your Gender
        </span>
        <div className="flex items-start space-x-2">
          <RadioInput
            label="Male"
            checked="checked"
            className="text-zinc-600"
            disabled="disabled"
          />
          <RadioInput label="Female" disabled="disabled" />
        </div>
      </div>
      <div className="flex flex-col items-start ml-[2rem] space-y-4">
        <span className="block text-[23px] font-medium text-zinc-500">
          Email Address
        </span>
        <div className="flex items-start w-[95%] md:w-[60%]">
          <TextInput
            label="Email"
            input={{
              type: "email",
              name: "email",
              id: "email",
            }}
            defaultValue={props.userData.email}
            disabled="disabled"
          />
        </div>
      </div>
      <div className="flex flex-col items-start ml-[2rem] space-y-4">
        <span className="block text-[23px] font-medium text-zinc-500">
          Phone Number
        </span>
        <div className="flex items-start w-[95%] md:w-[60%]">
          <TextInput
            label="MobileNumber"
            input={{
              type: "number",
              name: "mobilenumber",
              id: "mobilenumber",
            }}
            defaultValue={props.userData.mobilenumber}
            disabled="disabled"
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
