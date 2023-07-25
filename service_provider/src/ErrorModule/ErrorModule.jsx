import React from "react";
import Modal from "../UI/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import ButtonForm from "../UI/buttonForm";
const ErrorModule = (props) => {
  return (
    <Modal
      className="flex flex-col items-center max-w-[380px] md:left-[calc(50%-20rem)] py-[15px] px-[20px] rounded-[24px] bg-[#fff]"
      onClick={props.onClick}
      show={!!props.error}
    >
      <div class="">
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="text-[red] text-[48px]"
        />
      </div>
      <span className=" mt-2 w-[100%] h-[1px] bg-black"></span>
      <div className="flex flex-col flex-wrap items-center justify-center mt-[15px]">
        <h2 className=" font-[500] text-[25px] text-[#333]">
          An Error Occured!!!
        </h2>
        <h3 className="text-[20px] font-[400] text-[#333] mt-1">
          {props.error}
        </h3>
        <div className="mt-[25px]">
          <ButtonForm
            type="button"
            onClick={props.onClick}
            buttonContent="Ok, Close"
            className="btn-primary text-[#fff] text-[16px]"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ErrorModule;
