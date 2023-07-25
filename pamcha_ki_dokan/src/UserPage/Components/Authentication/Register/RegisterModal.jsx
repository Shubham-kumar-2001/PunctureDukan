import React from "react";
import Modal from "../../../../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../../../Store/auth-slice";
import Register from "./RegisterPassword";
const RegisterModel = () => {
  const dispatch = useDispatch();
  const renderLoginForm = useSelector((state) => state.auth.isRenderForm);
  const closeRenderLoginForm = () => {
    dispatch(authAction.renderForm());
  };
  return (
    <Modal
      onClick={closeRenderLoginForm}
      show={renderLoginForm}
      className="max-w-[400px] w-[350px] md:w-[100%] lg:w-[100%] md:!top-[10%] rounded overflow-hidden"
    >
      <Register />
    </Modal>
  );
};

export default RegisterModel;
