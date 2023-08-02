import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useHttpClient } from "../../../../Hooks/http-hook";
import BookServiceLoading from "./BookServiceLoading";
import BookServiceInfo from "./BookServiceInfo";
import ButtonForm from "./../../../../UI/buttonForm";
import MapBoxLocation from "../../Map/MapBox";
const BookService = () => {
  const navigate = useNavigate();
  const location = useSelector((state) => state.location.location);
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  const { service_id } = useParams();
  const {
    isLoading: isServiceLoading,
    error: serviceError,
    sendRequest: serviceSendRequest,
  } = useHttpClient();
  const {
    isLoading: isCoordinateLoading,
    error: coordinateError,
    sendRequest: coordinateSendRequest,
  } = useHttpClient();

  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await serviceSendRequest(
          `http://localhost:2020/api/puncturedukan/service/${service_id}`
        );
        const { success, message, service } = responseData;
        if (success) {
          setData(service);
        } else {
          handleError(message);
        }
      } catch (err) {
        handleError(serviceError);
      }
    };
    fetchUsers();
  }, [service_id]);
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_ADDRESS}${location.longitude},${location.latitude}.json?access_token=${process.env.REACT_APP_MAPBOX}`
        );
        setAddress(data.data.features[0].place_name);
      } catch (err) {}
    };
    fetchAddress();
  }, [location.longitude, location.latitude]);
  const orderSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await coordinateSendRequest(
        `http://localhost:2020/api/puncturedukan/serviceorder/orderdetail`,
        "POST",
        JSON.stringify({
          servicename: data.name,
          longitude: location.latitude,
          latitude: location.longitude,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      const { success, message } = responseData;
      if (success) {
        handleSuccess(message);
        navigate("/puncturedukan/providerdetail");
      }
    } catch (err) {
      handleError(coordinateError);
    }
  };
  return (
    <>
      {isServiceLoading && <BookServiceLoading />}
      {!isServiceLoading && (
        <div className="container ">
          <div className="flex flex-wrap mx-auto flex-col w-[99%] sm:w-[95%] sm:mx-auto md:w-[85%]">
            <div className="h-[50vh] w-[100%]">
              <MapBoxLocation />
            </div>
            <form
              onSubmit={orderSubmitHandler}
              className="z-40 w-[100%]  flex flex-col mx-auto
          flex-wrap justify-center items-start card shadow 
           rounded border-[1]"
            >
              <BookServiceInfo
                address={address}
                image={data.image}
                name={data.servicename}
                price={data.price}
              />

              <div className="w-[90%] flex  justify-center mx-auto">
                <ButtonForm
                  type="submit"
                  buttonContent={
                    isCoordinateLoading ? (
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
                      "Order"
                    )
                  }
                  className="btn-primary text-[20px] w-[70%] py-[.7rem] px-[2.6rem]  cursor-pointer mb-[1rem]"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookService;
