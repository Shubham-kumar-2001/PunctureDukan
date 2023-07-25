import React from "react";
import TextInput from "../../../UI/InputForm";
const UserDetail = (props) => {
  return (
    <div className="space-y-6 flex flex-col flex-wrap ">
      <div className="flex flex-wrap items-center justify-center mt-[2rem] md:mt-0">
        <span className="text-[30px] font-semibold">Personal Information</span>
      </div>
      <form className="grid gid-cols-1 lg:grid-cols-2 gap-4 w-[90%] mx-auto">
        <div className="grid grid-cols-1 mx-auto w-[100%] lg:w-[90%] my-[1rem] cursor-not-allowed">
          <TextInput
            label="FirstName"
            input={{
              type: "text",
              name: "firstname",
              id: "firstname",
            }}
            value={props.userData.firstname}
            disabled="disabled"
            className=" bg-zinc-300 rounded"
          />
        </div>
        <div className="grid grid-cols-1 mx-auto w-[100%] lg:w-[90%] my-[1rem] cursor-not-allowed">
          <TextInput
            label="LastName"
            input={{
              type: "text",
              name: "lastname",
              id: "lastname",
            }}
            value={props.userData.lastname}
            disabled="disabled"
            className="border-blue-900 bg-zinc-300 text-blue-400 cursor-not-allowed rounded"
          />
        </div>
        <div className="grid grid-cols-1 mx-auto w-[100%] lg:w-[90%] my-[1rem] cursor-not-allowed">
          <TextInput
            label="Email"
            input={{
              type: "email",
              name: "email",
              id: "email",
            }}
            value={props.userData.email}
            disabled="disabled"
            className="border-blue-900 bg-zinc-300 text-blue-400 cursor-not-allowed rounded"
          />
        </div>
        <div className="grid grid-cols-1 mx-auto w-[100%] lg:w-[90%] my-[1rem] cursor-not-allowed">
          <TextInput
            label="MobileNumber"
            input={{
              type: "number",
              name: "mobilenumber",
              id: "mobilenumber",
            }}
            value={props.userData.mobilenumber}
            disabled="disabled"
            className="border-blue-900 bg-zinc-300 text-blue-400 cursor-not-allowed rounded"
          />
        </div>
      </form>
    </div>
  );
};

export default UserDetail;
