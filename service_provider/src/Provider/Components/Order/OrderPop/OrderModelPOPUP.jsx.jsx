import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "../../../../UI/Modal";
import OrderPop from "./orderPop";
import { useHttpClient } from "../../../../Hooks/http-hook";
import AuthContex from "../../../../Store/AuthContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import MapBoxLocation from "../../Map/MapBox";
import { decryptData, encryptData } from "./../../../../utility/utility";
import { useNavigate } from "react-router-dom";
import Child from "./child";
const OrderModelPOPUP = (props) => {
  const authCtx = useContext(AuthContex);
  const intervalRef = useRef(null);
  const [order_id, setOrder_id] = useState({
    provider_id: "",
  });

  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [userOrderAddress, setUserOrderAddress] = useState([]);
  const [providerOrderAddress, setProviderOrderAddress] = useState([]);

  if (!userData.length && !Object.keys(userData).length) {
    const userOrderData = localStorage.getItem("userData");
    if (userOrderData) {
      const originalUserData = decryptData(userOrderData);
      if (originalUserData) {
        setUserData(originalUserData);
      }
    }
  }
  if (!orderData.length && !Object.keys(orderData).length) {
    const providerData = localStorage.getItem("providerData");
    if (providerData) {
      const originalProviderData = decryptData(providerData);
      if (originalProviderData) {
        setOrderData(originalProviderData);
      }
    }
  }
  if (!userOrderAddress.length && !Object.keys(userOrderAddress).length) {
    const userAddress = localStorage.getItem("userAddress");
    if (userAddress) {
      const originalUserAddress = decryptData(userAddress);
      if (originalUserAddress) {
        setUserOrderAddress(originalUserAddress);
      }
    }
  }

  const { sendRequest } = useHttpClient();
  const [open, setOpen] = useState(false);

  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
  const fetchUsers = async () => {
    try {
      const responseData = await sendRequest(
        `https://puncturedukan.onrender.com/api/puncturedukan/serviceorder/providerorderdetail`
      );
      const { success, provider } = responseData;
      console.log(provider.Geonear[0].username, "data");
      if (success && provider.Geonear[0].username === authCtx.user_id) {
        setOpen(true);
        const providerEncryptedAData = encryptData(provider.Geonear[0]);
        const userEncryptedAData = encryptData(provider.userdata[0]);
        localStorage.setItem("providerData", providerEncryptedAData);
        localStorage.setItem("userData", userEncryptedAData);
        setOrderData(provider.Geonear[0]);
        setUserData(provider.userdata[0]);
        setOrder_id({ provider_id: responseData.provider._id });
        const data = await axios.get(
          `${process.env.REACT_APP_ADDRESS}${provider.Geonear[0].providerlocation.coordinates[0]},${provider.Geonear[0].providerlocation.coordinates[1]}.json?access_token=${process.env.REACT_APP_MAPBOX}`
        );
        const providerEncryptedAddress = encryptData(
          data.data.features[0].place_name
        );
        localStorage.setItem("providerAddress", providerEncryptedAddress);
        setProviderOrderAddress(data.data.features[0].place_name);
        const useraddr = await axios.get(
          `${process.env.REACT_APP_ADDRESS}${provider.userdata[0].latitude},${provider.userdata[0].longitude}.json?access_token=${process.env.REACT_APP_MAPBOX}`
        );
        const userEncryptedAddress = encryptData(
          useraddr.data.features[0].place_name
        );
        localStorage.setItem("userAddress", userEncryptedAddress);
        setUserOrderAddress(useraddr.data.features[0].place_name);
      }
    } catch (err) {}
  };
  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      fetchUsers();
      console.log("hello");
      console.log(intervalRef.current);
    }, 17000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const acceptOrder = async () => {
    try {
      const responseData = await sendRequest(
        `https://puncturedukan.onrender.com/api/puncturedukan/serviceorder/acceptorder`,
        "POST",
        JSON.stringify({
          userlatitude: userData.latitude,
          userlongitude: userData.longitude,
          usermobilenumber: userData.mobilenumber,
          userfirstname: userData.firstname,
          userlastname: userData.lastname,
          servicename: orderData.servicename,
          providerlongitude: orderData.providerlocation.coordinates[1],
          providerlatitude: orderData.providerlocation.coordinates[0],
          userusername: userData.username,
          distance: orderData.calcDistance,
          image: orderData.image,
          price: orderData.price,
          shopname: orderData.companyname,
          order_id: order_id.provider_id,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      const { success, message, serviceOrder_id } = responseData;
      if (success) {
        setOpen(false);
        localStorage.setItem("acceptorder", true);
        props.setServiceOrder_id(serviceOrder_id);
        handleSuccess(message);
        navigate("/serviceprovider/puncturedukan/orderdata");
      }
    } catch (err) {
      handleError(err.message);
    }
  };
  const rejectOrder = async () => {
    try {
      const responseData = await sendRequest(
        `https://puncturedukan.onrender.com/api/puncturedukan/serviceorder/onrejectorder`,
        "PUT",
        JSON.stringify({
          order_id: order_id.provider_id,
          username: orderData.username,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      const { success, message } = responseData;
      if (success) {
        setOpen(false);
        localStorage.removeItem("userData");
        localStorage.removeItem("providerData");
        localStorage.removeItem("userAddress");
        localStorage.removeItem("providerAddress");
        localStorage.removeItem("acceptorder");
        localStorage.removeItem("verifyotp");
        handleSuccess(message);
      }
    } catch (err) {}
  };
  console.log(orderData, Object.keys(orderData).length, "orderdata");
  return (
    // <div className="container ">
    //   <div className="flex flex-wrap mx-auto flex-col w-[99%] sm:w-[95%] sm:mx-auto md:w-[85%]">
    <div className="w-[99%] h-[calc(100vh-4.5rem)] sm:w-[80%] sm:h-[calc(100vh-6rem)]  mx-auto my-auto rounded overflow-hidden">
      <MapBoxLocation />
      <Modal
        show={open && orderData.username === authCtx.user_id}
        className="max-w-[500px] w-[350px] md:w-[100%] lg:w-[100%] md:!top-[10%] rounded overflow-hidden "
      >
        <OrderPop
          acceptOrder={acceptOrder}
          providerAddress={providerOrderAddress}
          image={orderData.image}
          servicename={orderData.servicename}
          address={userOrderAddress}
          rejectOrder={rejectOrder}
        />
      </Modal>
      <Child orderData={orderData} currentTimer={intervalRef.current} />
    </div>
    //   </div>
    // </div>
  );
};

export default OrderModelPOPUP;
