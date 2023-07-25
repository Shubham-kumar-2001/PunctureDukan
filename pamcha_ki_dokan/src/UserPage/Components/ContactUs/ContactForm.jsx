import React from "react";
import classes from "./ContactUs.module.css";
import useInput from "../../../Hooks/user-input";
import TextInput from "../../../UI/InputForm";
import TextArea from "./../../../UI/TextArea";
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

  const invalidNameClasses = `
   ${nameHasError ? classes.invalid : ""}
  `;
  const invalidAddressClasses = `
  ${addressHasError ? classes.invalid : ""}
 `;

  const invalidPhoneNumberClasses = `
  ${phoneNumberHasError ? classes.invalid : ""}
 `;

  const invalidEmailClasses = `
  ${emailHasError ? classes.invalid : ""}
 `;

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
        className={invalidNameClasses}
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
        className={invalidEmailClasses}
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
        className={invalidPhoneNumberClasses}
      />
      <TextArea
        label="Message"
        input={{
          type: "text",
          name: "name",
          cols: "30",
          rows: "26",
        }}
        value={enteredAddressValue}
        onChange={inputAddressHandler}
        onBlur={addressBlurHandler}
        className={invalidAddressClasses}
      />
      <div className="flex justify-center gap-[2rem] flx-wrap">
        <button
          onClick={props.onClick}
          className=" hover:text-white cursor-pointer bg-red-200 
          rounded-xl hover:shadow  py-[1rem] px-[2rem] border-solid border-2
           hover:bg-red-500 text-[17px] font-semibold text-slate-500"
        >
          Cancel
        </button>
        {formIsValid && (
          <button
            className=" hover:text-white cursor-pointer bg-green-200 
          rounded-xl hover:shadow  py-[1rem] px-[2rem] border-solid 
          border-2 hover:bg-green-800 text-[17px] font-semibold text-slate-500"
            type="submit"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
