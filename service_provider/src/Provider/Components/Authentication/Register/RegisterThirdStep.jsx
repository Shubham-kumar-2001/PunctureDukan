import React from "react";
import classes from "../Login/LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import useInput from "../../../../Hooks/user-input";
import Card from "../../../../UI/Card";
import TextInput from "../../../../UI/InputForm";
import ButtonForm from "../../../../UI/buttonForm";
const firstNameHasEmpty = (value) =>
  value.trim() !== "" && value.trim().length >= 4;
const lastNameHasEmpty = (value) =>
  value.trim() !== "" && value.trim().length >= 4;
const RegisterThirdStep = (props) => {
  const navigate = useNavigate();

  const {
    value: enteredFirstNameValue,
    hasError: firstNameHasError,
    inputChangeHandler: inputFirstNameHandler,
    inputBlurHandler: firstNameBlurHandler,
    isValid: enteredFirstNameIsValid,
    reset: firstNameInputReset,
  } = useInput(firstNameHasEmpty);
  const {
    value: enteredLastNameValue,
    hasError: lastNameHasError,
    inputChangeHandler: inputLastNameHandler,
    inputBlurHandler: lastNameBlurHandler,
    isValid: enteredLastNameIsValid,
    reset: LastNameInputReset,
  } = useInput(lastNameHasEmpty);

  let formIsValid = enteredLastNameIsValid && enteredFirstNameIsValid;

  const registerFormSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const userDetail = {
      firstname: enteredFirstNameValue,
      lastname: enteredLastNameValue,
    };
    props.updateUser(userDetail);
    navigate("/serviceprovider/puncturedukan/register/final");
    firstNameInputReset();
    LastNameInputReset();
  };
  return (
    <Card className=" max-w-[350px] md:max-w-[550px] mx-auto">
      <div className="flex flex-col items-center justify-center  w-[100%] space-y-10">
        <div className="w-[100%] flex items-center justify-center flex-col mt-[1.5rem]">
          <span className="text-[25px] font-san font-semivold">
            Start filling your details
          </span>
          <span className="text-[20px] font-san font-natural mt-3 text-zinc-800">
            Enter your Name
          </span>
        </div>
        <div className="w-[90%] flex flex-wrap justify-center">
          <form
            onSubmit={registerFormSubmitHandler}
            className="flex flex-wrap items-center flex-col overflow-hidden justify-center
      relative w-[95%] bg-white space-y-6 mx-auto mb-[3rem]"
          >
            {" "}
            <TextInput
              label="FirstName"
              input={{
                type: "text",
                name: "firstName",
                id: "firstName",
              }}
              value={enteredFirstNameValue}
              onChange={inputFirstNameHandler}
              onBlur={firstNameBlurHandler}
              error={firstNameHasError}
              success={!firstNameHasError}
              message="Enter valid First Name"
            />
            <TextInput
              label="LastName"
              input={{
                type: "text",
                name: "lastName",
                id: "lastname",
              }}
              value={enteredLastNameValue}
              onChange={inputLastNameHandler}
              onBlur={lastNameBlurHandler}
              error={lastNameHasError}
              success={!lastNameHasError}
              message="Enter valid Last Name"
            />
            <div className="ml-auto">
              <ButtonForm
                type="submit"
                buttonContent="Next"
                className={`${
                  formIsValid
                    ? "btn-primary text-[18px]  cursor-pointer"
                    : "cursor-not-allowed bg-slate-600 font-normal  rounded-md py-[.5rem] px-[2.6rem] text-white  shadow-md text-[16px] leading-6 "
                }`}
              />
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default RegisterThirdStep;
