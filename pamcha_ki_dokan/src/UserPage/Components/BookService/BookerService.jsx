import React, { useState } from "react";
import ButtonForm from "../../../UI/buttonForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useHttpClient } from "../../../Hooks/http-hook";
import MapBoxLocation from "../Map/MapBox";
import LoadingSpinner from "./../../../UIElements/LoadingSpinner";
import DirectionMapBox from "./../Map/DirectionMapBox";
import OnAcceptOrder from "./OnAccept";
const BookService = () => {
  const location = useSelector((state) => state.location.location);
  const [providerAddress, setProviderAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetch, setfetch] = useState(true);
  const [providerDetail, setProviderDetail] = useState({
    name: "",
    mobilenumber: "",
    servicename: "",
    image: "",
    price: "",
    distance: "",
  });
  const [accept, setAccept] = useState(false);
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
  const { error: providerError, sendRequest: providerSendRequest } =
    useHttpClient();
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
        setData(responseData);
      } catch (err) {
        handleError(serviceError);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_ADDRESS}${location.longitude},${location.latitude}.json?access_token=${process.env.REACT_APP_MAPBOX}`
        );
        setAddress(data.data.features[0].place_name);
      } catch (err) {
        handleError("Enable Your Location");
      }
    };
    fetchAddress();
  }, [location.longitude, location.latitude]);
  // console.log(location.longitude, location.latitude, "location", data.name);
  const orderSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await coordinateSendRequest(
        `${process.env.REACT_APP_ORDER}orderdetail`,
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
        setAccept(true);
        setLoading(true);
        handleSuccess(message);
      }
    } catch (err) {
      handleError(coordinateError);
    }
  };
  useEffect(() => {
    const fetchProviderDetail = async () => {
      try {
        const providerData = await providerSendRequest(
          "http://localhost:2020/api/puncturedukan/auth/userorderdetail"
        );
        const { success, message, userOrderdata } = providerData;
        if (success) {
          setProviderDetail(userOrderdata);
          setLoading(false);
          const useraddr = await axios.get(
            `${process.env.REACT_APP_ADDRESS}${userOrderdata.providerlocation.coordinates[0]},${userOrderdata.providerlocation.coordinates[1]}.json?access_token=${process.env.REACT_APP_MAPBOX}`
          );
          setProviderAddress(useraddr.data.features[0].place_name);
          handleSuccess(message);
        }
      } catch (err) {
        handleError(providerError);
      }
    };
    const intervals = setInterval(() => {
      if (fetch) {
        fetchProviderDetail();
      }
      if (providerDetail.image !== "") {
        setfetch(false);
      }
    }, 1500);
    return () => {
      clearInterval(intervals);
    };
  }, []);
  console.log(providerDetail, fetch, "provider");
  return (
    <>
      {loading && <LoadingSpinner asOverlay />}
      {!accept && (
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
              <div className="flex flex-col w-[100%] justify-center my-[2rem] items-start  space-y-3">
                <div className="bg-white p-2 hover:bg-green-100 w-[100%] space-x-3 flex items-center">
                  {!isServiceLoading && (
                    <>
                      <span className="text-[25px] ml-[0.5rem]">
                        <i class="fa fa-location-arrow" aria-hidden="true"></i>
                      </span>
                      <span className="text-[19px] font-[400] text-zinc-700">
                        {address}
                      </span>
                    </>
                  )}
                  {isServiceLoading && (
                    <span className="text-[2rem] font-bold animate-pulse w-[100%] text-start">
                      <span className="placeholder w-[80%] md:w-[70%] lg:w-[40%]"></span>
                    </span>
                  )}
                </div>
                <div className="bg-white flex hover:bg-green-100 w-[100%]">
                  <div className="w-[80px] h-[82px] min-w-[82px] ml-[10px] flex flex-col items-center justify-center">
                    {!isServiceLoading && (
                      <img
                        src={data.image}
                        alt="Loading.."
                        className="max-h-[95%] max-w-[95%] m-auto "
                      />
                    )}
                    {isServiceLoading && (
                      <span className=" animate-pulse h-[95%] w-[95%] m-auto mt-4  text-start">
                        <span className="placeholder h-[100%] w-[97%] m-auto"></span>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col flex-wrap ml-[20px] items-start justify-center w-[100%]">
                    {!isServiceLoading && (
                      <span className="text-[16px] font-[450] text-stone-900">
                        {data.name}
                      </span>
                    )}
                    {isServiceLoading && (
                      <span className="text-[2rem] font-bold animate-pulse w-[100%] text-start">
                        <span className="placeholder w-[50%] md:w-[70%] lg:w-[40%]"></span>
                      </span>
                    )}
                    <span className="inline-flex items-start w-[100%]  ">
                      {!isServiceLoading && (
                        <span className="text-[15px] font-[450] text-stone-800 bg-slate-100 p-1 pl-0">
                          ₹{data.price}
                        </span>
                      )}
                      {isServiceLoading && (
                        <span className="text-[2rem] font-bold animate-pulse w-[100%] text-start">
                          <span className="placeholder w-[40%]"></span>
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
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
      {accept && !loading && (
        <>
          <div className="w-[99%] h-[60vh] sm:w-[80%] sm:h-[calc(100vh-6rem)]  mx-auto my-auto rounded overflow-hidden">
            <DirectionMapBox
              destilatitude={providerDetail.providerlocation.coordinates[0]}
              destilongitude={providerDetail.providerlocation.coordinates[1]}
            />
          </div>
          <OnAcceptOrder
            name={providerDetail.serviceprovidername}
            address={providerAddress}
            mobilenumber={providerDetail.providermobilenumber}
            servicename={providerDetail.servicename}
            image={providerDetail.image}
            price={providerDetail.price}
            distance={parseFloat(providerDetail.distance)}
            otp={providerDetail.otp}
          />
        </>
      )}
    </>
  );
};

export default BookService;
