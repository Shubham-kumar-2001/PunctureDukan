import React, { useEffect, useState } from "react";
import ListOrder from "./list";
import { toast } from "react-toastify";
import ListOrderLoader from "./ListLoader";
import NothingOnOrder from "./NothingOnOrder";
import { useHttpClient } from "../../../Hooks/http-hook";
const Order = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [orderservice, setOrderservice] = useState([]);
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
        console.log(responseData)
        if (success) {
          setOrderservice(orderservice);
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
      {!isLoading && orderservice.length <= 0 && <NothingOnOrder />}
      {!isLoading && orderservice.length >= 1 && (
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
              {orderservice.map((data, index) => (
                <ListOrder
                  image={data.image}
                  serviceName={data.servicename}
                  providername={
                    data.providerfirstname + "" + data.providerlastname
                  }
                  price={data.price}
                  userlati={data.location.coordinates[0][0][0]}
                  userlongi={data.location.coordinates[0][0][1]}
                  providerlati={data.location.coordinates[0][1][0]}
                  providerlongi={data.location.coordinates[0][1][1]}
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
