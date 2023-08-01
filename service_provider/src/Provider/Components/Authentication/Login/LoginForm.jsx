import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHttpClient } from "../../../../Hooks/http-hook";
import AuthContex from "../../../../Store/AuthContextProvider";
import useInput from "../../../../Hooks/user-input";
import { toast } from "react-toastify";
import Card from "../../../../UI/Card";
import TextInput from "../../../../UI/InputForm";
import ButtonForm from "../../../../UI/buttonForm";
import PasswordInput from "../../../../UI/PasswordInput";
import OTPForm from "../../OTP/OTPForm";
const phoneNumberHasEmpty = (value) => value.trim().length === 10;
const passwordValidate = (value) => value.trim().length >= 8;
const EmailValidate = (value) => value.includes("@");
const LoginForm = () => {
  const [isPhone, setPhone] = useState(true);
  const authCtx = useContext(AuthContex);
  const navigate = useNavigate();
  const [generated, setGenerated] = useState(false);
  const [generateData, setGeneratedData] = useState({});
  const {
    isLoading: isPasswordLoading,
    error: passwordError,
    sendRequest: passwordSendRequest,
  } = useHttpClient();
  const { isLoading: isOTPLoading, sendRequest: OTPSendRequest } =
    useHttpClient();
  const {
    value: enteredEmailValue,
    hasError: emailHasError,
    inputChangeHandler: inputEmailHandler,
    inputBlurHandler: emailBlurHandler,
    isValid: enteredEmailIsValid,
    reset: emailInputReset,
  } = useInput(EmailValidate);
  const {
    numberValue: enteredPhoneNumberValue,
    hasNumberError: phoneNumberHasError,
    inputNumberChangeHandler: inputPhoneNumberHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    isNumberValid: enteredPhoneNumberIsValid,
    reset: phoneNumberInputReset,
  } = useInput(phoneNumberHasEmpty);
  const {
    value: enteredPasswordValue,
    hasError: passwordHasError,
    inputChangeHandler: inputPasswordHandler,
    inputBlurHandler: passwordBlurHandler,
    isValid: enteredPasswordIsValid,
    reset: passwordInputReset,
  } = useInput(passwordValidate);

  let formIsValid =
    (enteredPasswordIsValid && enteredEmailIsValid) ||
    (enteredPasswordIsValid && enteredPhoneNumberIsValid);

  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const loginFormSubmitHandler = async (event) => {
    event.preventDefault();
    const inputValue = {
      email: enteredEmailValue,
      password: enteredPasswordValue,
      mobilenumber: enteredPhoneNumberValue,
    };
    setGeneratedData(inputValue);

    if (enteredPasswordIsValid) {
      try {
        const data = await passwordSendRequest(
          `${process.env.REACT_APP_PROVIDER_API}login`,
          "POST",
          JSON.stringify({ ...inputValue }),
          {
            "Content-Type": "application/json",
          }
        );
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          console.log(data.token);
          authCtx.login(data.token);
          navigate("/serviceprovider/puncturedukan/locate");
        } else {
          handleError(message);
        }
      } catch (err) {
        console.log(err.message);
        handleError(passwordError);
      }
    } else {
      try {
        const data = await OTPSendRequest(
          `${process.env.REACT_APP_PROVIDER_API}generateloginotp`,
          "POST",
          JSON.stringify({ ...inputValue }),
          {
            "Content-Type": "application/json",
          }
        );
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          setGenerated(true);
        } else {
          handleError(message);
          setGenerated(false);
        }
      } catch (error) {
        console.log(error);
        handleError(error.message);
        setGenerated(false);
      }
    }
    emailInputReset();
    passwordInputReset();
    phoneNumberInputReset();
  };
  const renderEmail = () => {
    setPhone(!isPhone);
  };
  const resetData = () => {
    setGeneratedData({});
  };
  return (
    <>
      {!generated && (
        <Card
          className="max-w-[550px] rounded overflow-hidden mx-auto w-[350px] md:w-[400px]
          lg:w-[100%] bg-white"
        >
          <div className="flex flex-wrap w-[100%] relative mt-[1rem] shadow rounded-lg mx-auto">
            <div className="flex flex-col items-center justify-center w-[100%] mx-auto relative space-y-5">
              <div className="flex items-center my-[1rem]">
                <span className="text-[25px] font-medium">Login</span>
              </div>
              <div className="w-[100%]">
                <form
                  onSubmit={loginFormSubmitHandler}
                  className="flex flex-wrap items-center flex-col overflow-hidden justify-center
        relative w-[95%] bg-white space-y-6 mx-auto mb-4"
                >
                  {!isPhone && (
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
                  )}
                  {isPhone && (
                    <TextInput
                      label="Mobile No"
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
                  )}
                  <div className="absolute top-[10%] right-1">
                    <ButtonForm
                      onClick={renderEmail}
                      type="button"
                      buttonContent={
                        isPhone ? "Use email insted" : "Use Phone insted"
                      }
                      className="text-[12px] font-medium text-blue-600 italic"
                    />
                  </div>
                  <PasswordInput
                    label="Password"
                    onChange={inputPasswordHandler}
                    onBlur={passwordBlurHandler}
                    value={enteredPasswordValue}
                    error={passwordHasError}
                    success={!passwordHasError}
                    message="Password should greater than 8 digit"
                  />

                  <div className="flex flex-col items-center justify-center mx-auto space-y-4 w-[90%]">
                    <ButtonForm
                      type="submit"
                      buttonContent={
                        isPasswordLoading ? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              class="inline w-5 h-5 mr-2 text-white animate-spin dark:text-gray-600 fill-blue-900"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span class=" text-white text-[15px] ml-[0.7rem]">
                              Loading...
                            </span>
                          </div>
                        ) : (
                          "Login"
                        )
                      }
                      disabled={!formIsValid}
                      className={`${
                        formIsValid
                          ? "btn-primary text-[18px] w-[100%] px-[2.6rem] py-[.7rem] cursor-pointer"
                          : "cursor-not-allowed bg-slate-600 font-normal  rounded-md py-[.5rem] px-[2.6rem] text-white w-[100%] shadow-md text-[16px] leading-6 "
                      }`}
                    />
                    <ButtonForm
                      type="button"
                      buttonContent={
                        <Link
                          className="no-underline text-inherit"
                          to="/serviceprovider/puncturedukan/register/first"
                        >
                          New User ? Sign Up
                        </Link>
                      }
                      className=" py-[0.5rem] px-[2.6rem] rounded-lg
                 text-blue-600 w-[90%] hover:bg-blue-900 hover:text-white leading-5"
                    />
                    <span className="w-[100%] border-[1px] border-solid border-black m-0 p-0"></span>
                    <ButtonForm
                      type="submit"
                      buttonContent={
                        isOTPLoading ? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              class="inline w-5 h-5 mr-2 text-white animate-spin dark:text-gray-600 fill-blue-900"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span class=" text-white text-[15px] ml-[0.7rem]">
                              Loading...
                            </span>
                          </div>
                        ) : (
                          "Request OTP"
                        )
                      }
                      disabled={
                        !(enteredEmailIsValid || enteredPhoneNumberIsValid)
                      }
                      className={`${
                        enteredEmailIsValid || enteredPhoneNumberIsValid
                          ? "btn-primary text-[18px] w-[100%] py-[.7rem] px-[2.6rem]  cursor-pointer"
                          : "cursor-not-allowed bg-slate-600 font-normal  rounded-md py-[.5rem] px-[2.6rem] text-white w-[100%] shadow-md text-[16px] leading-6 "
                      }`}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Card>
      )}
      {generated && (
        <OTPForm
          data={generateData}
          routeUrl="verifyloginotp"
          resetData={resetData}
          route="serviceprovider/puncturedukan"
          otpRoute="generateloginotp"
        />
      )}
    </>
  );
};

export default LoginForm;
