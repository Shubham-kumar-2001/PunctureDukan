import React, { useEffect, useState } from "react";
import ListOrder from "./list";

import { toast } from "react-toastify";
import ListOrderLoader from "./ListLoader";
import NothingOnOrder from "./NothingOnOrder";
import { useHttpClient } from "../../../../Hooks/http-hook";
import { axios } from "axios";
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
          "https://puncturedukan.onrender.com/api/puncturedukan/serviceprovider/serviceprovided"
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
          <div className="w-[90%] flex flex-wrap mx-auto items-center justify-center">
            <ul className="m-0 p-0 flex-1 space-y-5">
              {isLoading &&
                Array.from({ length: 6 }, (_, i) => <ListOrderLoader />)}
            </ul>
          </div>
        </div>
      )}
      {!isLoading && !orderData.length && <NothingOnOrder />}
      {!isLoading && orderData && (
        <div className="container mx-auto">
          <div className="w-[90%] flex flex-wrap mx-auto items-center justify-center">
            <ul className="m-0 p-0 flex-1 space-y-5">
              {orderData.map((data, index) => (
                <ListOrder
                  image={data.image}
                  serviceName={data.servicename}
                  name={data.userfirstname + "" + data.userlastname}
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
