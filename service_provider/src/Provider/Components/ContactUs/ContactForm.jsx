import React from "react";
import classes from "./ContactUs.module.css";
import useInput from "../../../Hooks/user-input";
import TextInput from "../../../UI/InputForm";
import TextArea from "./../../../UI/TextArea";
import ButtonForm from "../../../UI/buttonForm";
const nameHasEmpty = (value) => value.trim() !== "";
const phoneNumberHasEmpty = (value) => value.trim().length === 10;
const addressHasEmpty = (value) => value.trim() !== "";
const emailValidate = (value) => value.includes("@");
const ContactForm = (props) => {
  const {
    value: enteredNameValue,
    hasError: nameHasError,
    inputChangeHandler: inputNameHandler,
    inputBlurHandler: nameBlurHandler,
    isValid: enteredNameIsValid,
    reset: nameInputReset,
  } = useInput(nameHasEmpty);
  const {
    numberValue: enteredPhoneNumberValue,
    hasNumberError: phoneNumberHasError,
    inputNumberChangeHandler: inputPhoneNumberHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    isNumberValid: enteredPhoneNumberIsValid,
    reset: phoneNumberInputReset,
  } = useInput(phoneNumberHasEmpty);
  const {
    value: enteredAddressValue,
    hasError: addressHasError,
    inputChangeHandler: inputAddressHandler,
    inputBlurHandler: addressBlurHandler,
    isValid: enteredAddressIsValid,
    reset: addressInputReset,
  } = useInput(addressHasEmpty);
  const {
    value: enteredEmailValue,
    hasError: emailHasError,
    inputChangeHandler: inputEmailHandler,
    inputBlurHandler: emailBlurHandler,
    isValid: enteredEmailIsValid,
    reset: emailInputReset,
  } = useInput(emailValidate);

  let formIsValid =
    enteredNameIsValid &&
    enteredPhoneNumberIsValid &&
    enteredEmailIsValid &&
    enteredAddressIsValid;
  console.log(formIsValid);

  const addressFormSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    nameInputReset();
    addressInputReset();
    phoneNumberInputReset();
    emailInputReset();
    // const addressData = {
    //   name: enteredNameValue,
    //   phone: enteredPhoneNumberValue,
    //   address: enteredAddressValue,
    //   email: enteredEmailValue,
    //   id: Math.random(),
    // };

    // props.onNewAddressAddData({ ...addressData });
  };

  return (
    <form
      onSubmit={addressFormSubmitHandler}
      className=" flex flex-wrap items-center flex-col overflow-hidden justify-center
      relative w-[100%] bg-white space-y-10"
    >
      <TextInput
        label="Name"
        input={{
          type: "text",
          name: "name",
          id: "name",
        }}
        value={enteredNameValue}
        onChange={inputNameHandler}
        onBlur={nameBlurHandler}
        error={nameHasError}
        success={!nameHasError}
        message="Enter valid Phone Number"
      />
      <TextInput
        label="Email"
        input={{
          type: "email",
          name: "email",
        }}
        onChange={inputEmailHandler}
        onBlur={emailBlurHandler}
        value={enteredEmailValue}
        error={emailHasError}
        success={!emailHasError}
        message="Enter valid Email"
      />

      <TextInput
        label="10 digit mobile no"
        input={{
          type: "text",
          name: "phone",
          maxLength: "10",
          id: "phone",
        }}
        value={enteredPhoneNumberValue}
        onChange={inputPhoneNumberHandler}
        onBlur={phoneNumberBlurHandler}
        error={phoneNumberHasError}
        success={!phoneNumberHasError}
        message="Enter valid Phone Number"
      />
      <TextArea
        label="Message"
        input={{
          type: "text",
          name: "name",
          cols: "20",
          rows: "6",
        }}
        value={enteredAddressValue}
        onChange={inputAddressHandler}
        onBlur={addressBlurHandler}
      />

      <div className="flex space-x-7 mt-[1rem]">
        <ButtonForm
          onClick={props.acceptOrder}
          type="button"
          buttonContent="Accept"
          disabled={!formIsValid}
          className={`${
            formIsValid
              ? "text-[20px] w-full text-white bg-green-700 hover:green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              : "text-[20px] cursor-not-allowed w-full text-white bg-gray-700 hover:gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          }`}
        />
        <ButtonForm
          onClick={props.rejectOrder}
          type="button"
          buttonContent="Cancel"
          className="text-[20px] w-full text-white bg-red-700 hover:red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        />
      </div>
    </form>
  );
};

export default ContactForm;
