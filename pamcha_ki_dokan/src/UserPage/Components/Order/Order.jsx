import React, { useEffect, useState } from "react";
import ListOrder from "./list";
import { toast } from "react-toastify";
import ListOrderLoader from "./ListLoader";
import NothingOnOrder from "./NothingOnOrder";
import { useHttpClient } from "../../../Hooks/http-hook";
import axios from "axios";
const Order = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [orderData, setOrderData] = useState([]);
  const [useraddress, setUseraddress] = useState([]);
  const [provideraddress, setProvideraddress] = useState([]);
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "https://puncturedukan.onrender.com/api/puncturedukan/auth/orderservice"
        );

        const { success, message, orderservice } = responseData;
        if (success) {
          setOrderData(orderservice);
          const user = await axios.get(
            `${process.env.REACT_APP_ADDRESS}${orderservice.location.coordinates[0][0][0]},${orderservice.location.coordinates[0][0][1]}.json?access_token=${process.env.REACT_APP_MAPBOX}`
          );
          setUseraddress(user.data.features[0].place_name);
          const provider = await axios.get(
            `${process.env.REACT_APP_ADDRESS}${orderservice.location.coordinates[0][1][0]},${orderservice.location.coordinates[0][1][1]}.json?access_token=${process.env.REACT_APP_MAPBOX}`
          );
          setProvideraddress(provider.data.features[0].place_name);
        } else {
          handleError(message);
        }
      } catch (err) {
        handleError(error);
      }
    };
    fetchUsers();
  }, [sendRequest]);
  return (
    <>
      {isLoading && (
        <div className="container mx-auto">
          <div className="flex flex-col items-center ">
            <div className="mt-[3rem] mb-[1rem]">
              <span className="text-[19px] sm:text-[22px] md:text-[30px] font-bold text-gray-700">
                <div className="bg-gray-200 h-5 rounded-full dark:bg-gray-700 w-48 mb-4 "></div>
              </span>
            </div>
          </div>
          <div className="w-[90%] flex flex-wrap mx-auto items-center justify-center">
            <ul className="m-0 p-0 flex-1 space-y-5">
              {isLoading &&
                Array.from({ length: 6 }, (_, i) => <ListOrderLoader />)}
            </ul>
          </div>
        </div>
      )}
      {!isLoading && orderData.length <= 0 && <NothingOnOrder />}
      {!isLoading && orderData.length >= 1 && (
        <div className="container mx-auto">
          <div className="flex flex-col items-center ">
            <div className="mt-[3rem] mb-[1rem]">
              <span className="text-[19px] sm:text-[22px] md:text-[30px] font-bold text-gray-700">
                Your Order Section
              </span>
            </div>
          </div>
          <div className="w-[90%] flex flex-wrap mx-auto items-center justify-center">
            <ul className="m-0 p-0 flex-1 space-y-5">
              {orderData.map((data, index) => (
                <ListOrder
                  image={data.image}
                  serviceName={data.servicename}
                  name={data.providerfirstname + "" + data.providerlastname}
                  price={data.price}
                  provideraddress={provideraddress}
                  useraddress={useraddress}
                  status={data.status}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
