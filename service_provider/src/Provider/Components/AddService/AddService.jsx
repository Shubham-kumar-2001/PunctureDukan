import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContex from "../../../Store/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { useHttpClient } from "../../../Hooks/http-hook";
import useInput from "../../../Hooks/user-input";
import { toast } from "react-toastify";
import Card from "../../../UI/Card";
import ButtonForm from "../../../UI/buttonForm";
import TextInput from "../../../UI/InputForm";
import InputDropDown from "../../../UI/InputDropDown";
// import CardImageContainer from "../../../UI/cardImageContainer";
import ConvertToBase64 from "../../../Middleware/helper";
import CardImageContainer from "../../../UI/cardImageContainer";
import { useSelector } from "react-redux";
const servicePriceHasEmpty = (value) => value.trim().length >= 1;
const shopNameValidate = (value) => value.trim().length >= 5;
const serviceNameValidate = (value) => value.trim() !== "";
const AddService = () => {
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState(false);
  const authCtx = useContext(AuthContex);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = useHttpClient();
  const location = useSelector((state) => state.location.location);
  const {
    value: enteredShopNameValue,
    hasError: shopNameHasError,
    inputChangeHandler: inputShopNameHandler,
    inputBlurHandler: shopNameBlurHandler,
    isValid: enteredShopNameIsValid,
    reset: shopNameInputReset,
  } = useInput(shopNameValidate);
  const {
    numberValue: enteredServicePriceValue,
    hasNumberError: servicePriceHasError,
    inputNumberChangeHandler: inputServicePriceHandler,
    inputBlurHandler: servicePriceBlurHandler,
    isNumberValid: enteredServicePriceIsValid,
    reset: servicePriceInputReset,
  } = useInput(servicePriceHasEmpty);
  const {
    value: enteredServiceNameValue,
    hasError: serviceNameHasError,
    inputChangeHandler: inputServiceNameHandler,
    inputBlurHandler: serviceNameBlurHandler,
    isValid: enteredServiceNameIsValid,
    reset: serviceNameInputReset,
  } = useInput(serviceNameValidate);
  let formIsValid =
    enteredShopNameIsValid &&
    enteredServicePriceIsValid &&
    enteredServiceNameIsValid;

  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
  const onUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const base64 = await ConvertToBase64(file);
      setImage(base64);
      console.log(base64);
      setImageError(false);
    } catch (err) {
      setImageError(true);
      setImage("");
    }
  };
  const imageInputReset = () => {
    setImage("");
  };
  const addServiceFormHandler = async (event) => {
    event.preventDefault();
    if (!location.latitude || !location.longitude) {
      return handleError("Enable your location");
    }
    const inputValue = {
      shopname: enteredShopNameValue,
      servicename: enteredServiceNameValue,
      price: enteredServicePriceValue,
      image: image,
      latitude: location.longitude,
      longitude: location.latitude,
    };
    try {
      const data = await sendRequest(
        "https://puncturedukan.onrender.com/api/puncturedukan/serviceprovider/addservice",
        "POST",
        JSON.stringify({ ...inputValue }),
        {
          "Content-Type": "application/json",
        }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        authCtx.login(data.token);
        navigate("/serviceprovider/puncturedukan/locate");
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err.message);
      handleError(error);
    }
    shopNameInputReset();
    serviceNameInputReset();
    servicePriceInputReset();
    imageInputReset();
  };
  return (
    <div
      className="max-w-[550px] rounded  mx-auto w-[350px] md:w-[400px] 
          lg:w-[100%] bg-white sm:card sm:rounded-lg sm:border-none"
    >
      <div className="flex flex-wrap w-[100%] relative mt-[1rem]  mx-auto">
        <div className="flex flex-col items-center justify-center w-[100%] mx-auto relative space-y-5">
          <div className="flex items-center my-[1rem]">
            <span className="text-[25px] font-medium">Add Service</span>
          </div>
          <div className="w-[100%]">
            <form
              onSubmit={addServiceFormHandler}
              className="flex flex-wrap items-center flex-col  justify-center
              relative w-[95%] bg-white space-y-6 mx-auto mb-4"
            >
              <TextInput
                label="Shop Name"
                input={{
                  type: "text",
                  name: "shopname",
                }}
                onChange={inputShopNameHandler}
                onBlur={shopNameBlurHandler}
                value={enteredShopNameValue}
                error={shopNameHasError}
                success={!shopNameBlurHandler}
                message="Enter valid Shop Name"
              />
              <TextInput
                label="Service Price"
                input={{
                  type: "text",
                  name: "price",
                  maxLength: "3",
                }}
                value={enteredServicePriceValue}
                onChange={inputServicePriceHandler}
                onBlur={servicePriceBlurHandler}
                error={servicePriceHasError}
                success={!servicePriceHasError}
                message="Enter valid Price"
              />
              <InputDropDown
                value={enteredServiceNameValue}
                onChange={inputServiceNameHandler}
                onBlur={serviceNameBlurHandler}
                error={serviceNameHasError}
                success={!serviceNameHasError}
                message="Enter valid Price"
              />
              <CardImageContainer
                onUpload={onUpload}
                name=" ServiceImage"
                image={image}
                error={imageError}
                message="Eneter valid Pan Card Image"
                className="sm:w-[490px] w-[95%]"
              />
              <div className="flex justify-center mx-auto space-x-6 w-[95%] absolute top-[calc(95vh-10rem)] sm:relative sm:top-0">
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
                      "Add Service"
                    )
                  }
                  disabled={!formIsValid}
                  className={`${
                    formIsValid
                      ? "text-[20px] w-full text-white bg-green-700 hover:green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      : "text-[20px] cursor-not-allowed w-full text-white bg-zinc-700 hover:zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800"
                  }`}
                />

                <ButtonForm
                  type="button"
                  buttonContent="Cancel"
                  className="text-[20px] w-full text-white bg-red-700 hover:red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
