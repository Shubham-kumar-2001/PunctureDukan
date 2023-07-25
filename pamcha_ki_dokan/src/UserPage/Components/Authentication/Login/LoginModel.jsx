import React from "react";
import Modal from "../../../../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../../../Store/auth-slice";
import { ToastContainer } from "react-toastify";
import LoginForm from "./LoginForm";
import ButtonForm from "../../../../UI/buttonForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const LoginModel = () => {
  const dispatch = useDispatch();
  const renderLoginForm = useSelector((state) => state.auth.isRenderForm);
  const closeRenderLoginForm = () => {
    dispatch(authAction.renderForm());
  };
  return (
    <>
      <ToastContainer style={{ zIndex: "11111111111" }} />
      <Modal
        onClick={closeRenderLoginForm}
        show={renderLoginForm}
        className="max-w-[500px] w-[350px] md:w-[100%] lg:w-[100%] md:!top-[10%] rounded overflow-hidden"
      >
        <div>
          <LoginForm />
          <div className="absolute top-0 right-[4%] text-[30px] cursor-pointer m-0 p-0 font-light">
            <ButtonForm
              buttonContent={<FontAwesomeIcon icon={faXmark} />}
              onClick={closeRenderLoginForm}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoginModel;
