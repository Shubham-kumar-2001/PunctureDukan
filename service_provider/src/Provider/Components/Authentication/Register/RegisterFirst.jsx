import React from "react";
import ButtonForm from "../../../../UI/buttonForm";
import useInput from "../../../../Hooks/user-input";
import classes from "../Login/LoginForm.module.css";
import TextInput from "../../../../UI/InputForm";
import Card from "../../../../UI/Card";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { useHttpClient } from "../../../../Hooks/http-hook";
import OTPForm from "../../OTP/OTPForm";
const phoneNumberHasEmpty = (value) => value.trim().length === 10;
const RegisterFirstStep = (props) => {
  const [generated, setGenerated] = useState(false);
  const [generateData, setGeneratedData] = useState({});
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const {
    numberValue: enteredPhoneNumberValue,
    hasNumberError: phoneNumberHasError,
    inputNumberChangeHandler: inputPhoneNumberHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    isNumberValid: enteredPhoneNumberIsValid,
    reset: phoneNumberInputReset,
  } = useInput(phoneNumberHasEmpty);
  let formIsValid = enteredPhoneNumberIsValid;
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
  const registerFormSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const userDetail = {
      mobilenumber: enteredPhoneNumberValue,
    };

    try {
      const data = await sendRequest(
        "http://localhost:2020/api/puncturedukan/serviceprovider/generateotp",
        "POST",
        JSON.stringify({ mobilenumber: enteredPhoneNumberValue }),
        {
          "Content-Type": "application/json",
        }
      );

      const { success, message } = data;
      console.log(data);
      if (success) {
        handleSuccess(message);
        setGenerated(true);
        setGeneratedData(userDetail);
        props.updateUser(userDetail);
      } else {
        handleError(message);
        setGenerated(false);
      }
    } catch (err) {
      console.log(error);
      handleError(err);
      setGenerated(false);
    }
    phoneNumberInputReset();
  };
  const resetData = () => {
    setGeneratedData({});
  };
  return (
    <>
      {!generated && (
        <Card className=" max-w-[350px] md:max-w-[550px] mx-auto">
          <div className="flex flex-col items-center justify-center  w-[100%] space-y-10">
            <div className="w-[100%] flex items-center justify-center flex-col mt-[1.5rem]">
              <span className="text-[25px] font-san font-semivold">
                Start filling your details
              </span>
              <span className="text-[20px] font-san font-natural mt-3 text-zinc-800">
                Verify your Mobile Number
              </span>
            </div>
            <div className="w-[90%] flex flex-wrap justify-center">
              <form
                onSubmit={registerFormSubmitHandler}
                className="flex flex-wrap items-center flex-col overflow-hidden justify-center
                    relative w-[95%] bg-white mx-auto mb-[1rem]"
              >
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
                  uccess={!phoneNumberHasError}
                  message="Enter valid Phone Number"
                />
                <div className=" flex w-[90%] mx-auto mt-[2rem]">
                  <ButtonForm
                    type="submit"
                    buttonContent={
                      isLoading ? (
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
                        "Verify Mobile Number"
                      )
                    }
                    disabled={!formIsValid}
                    className={`${
                      formIsValid
                        ? "btn-primary text-[18px] w-[100%] px-[2rem] py-[1.1rem] cursor-pointer"
                        : "cursor-not-allowed bg-slate-600 font-normal  rounded-md py-[.5rem] px-[2.6rem] text-white w-[100%] shadow-md text-[16px] leading-6 "
                    }`}
                  />
                </div>
              </form>
            </div>
          </div>
        </Card>
      )}
      {generated && (
        <OTPForm
          data={generateData}
          route="serviceprovider/puncturedukan/register/second"
          routeUrl="serviceprovider/verifyotp"
          resetData={resetData}
        />
      )}
    </>
  );
};

export default RegisterFirstStep;
