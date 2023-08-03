import React, { useEffect, useState } from "react";
import ListOrder from "./list";

import { toast } from "react-toastify";
import ListOrderLoader from "./ListLoader";
import NothingOnOrder from "./NothingOnOrder";
import { useHttpClient } from "../../../../Hooks/http-hook";
const Order = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [orderData, setOrderData] = useState([]);
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
      {/* {!isLoading && orderData && (
        <div className="container mx-auto">
          <div className="w-[90%] flex flex-wrap mx-auto items-center justify-center">
            <ul className="m-0 p-0 flex-1 space-y-5">
              {orderData.map((data, index) => (
                <ListOrder
                  image={data.image}
                  serviceName={data.serviceName}
                  name={data.name}
                  price={data.price}
                />
              ))}
            </ul>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Order;
