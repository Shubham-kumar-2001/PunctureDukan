import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "../../../UI/Modal";
import OrderPop from "./orderPop";
import { useHttpClient } from "../../../Hooks/http-hook";
import AuthContex from "../../../Store/AuthContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import OnAcceptOrder from "./OnAccept";
import MapBoxLocation from "../Map/MapBox";
import DirectionMapBox from "../Map/DirectionMapBox";
import LoadingSpinner from "../../../UIElements/LoadingSpinner";
const OrderModelPOPUP = () => {
  const [order_id, setOrder_id] = useState();
  const [accept, setAccept] = useState(false);
  const [open, setOpen] = useState(false);
  const authCtx = useContext(AuthContex);
  const [address, setAddress] = useState(" ");
  const [useraddress, setUseraddress] = useState("");
  const [userData, setuserData] = useState({ firstname: "", lastname: "" });
  const [orderDetail, setOrderDetail] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [orderData, setOrderData] = useState({ image: "", servicename: "" });
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
        const responseData = await sendRequest(
          `${process.env.REACT_APP_ORDER}providerorderdetail`
        );
        const { success, provider } = responseData;
        console.log(responseData.provider._id, "data");
        if (success && provider.Geonear[0].username === authCtx.user_id) {
          setOpen(true);
          setOrderData(provider.Geonear[0]);
          setuserData(provider.userdata[0]);
          setOrder_id(responseData.provider._id);
          const data = await axios.get(
            `${process.env.REACT_APP_ADDRESS}${provider.Geonear[0].providerlocation.coordinates[0]},${provider.Geonear[0].providerlocation.coordinates[1]}.json?access_token=${process.env.REACT_APP_MAPBOX}`
          );
          console.log(provider.userdata[0], "lati");
          setAddress(data.data.features[0].place_name);
          const useraddr = await axios.get(
            `${process.env.REACT_APP_ADDRESS}${provider.userdata[0].latitude},${provider.userdata[0].longitude}.json?access_token=${process.env.REACT_APP_MAPBOX}`
          );
          setUseraddress(useraddr.data.features[0].place_name);
        }
      } catch (err) {}
    };
    const intervals = setInterval(() => {
      if (!accept) {
        fetchUsers();
      }
    }, 17000);
    return () => clearInterval(intervals);
  }, []);

  const acceptOrder = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_ORDER}acceptorder`,
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
          order_id,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      const { success, message } = responseData;
      if (success) {
        setOpen(false);
        setAccept(true);
        handleSuccess(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };
  const rejectOrder = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_ORDER}onrejectorder`,
        "PUT",
        JSON.stringify({ order_id, username: orderData.username }),
        {
          "Content-Type": "application/json",
        }
      );
      const { success, message } = responseData;
      if (success) {
        setOpen(false);
        setAccept(false);
        handleSuccess(message);
      }
    } catch (err) {}
  };
  console.log(orderData, "order");
  console.log(userData, "usr");
  console.log(address, "address");
  console.log(accept);
  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {!accept && (
        <div className="w-[99%] h-[calc(100vh-4.5rem)] sm:w-[80%] sm:h-[calc(100vh-6rem)]  mx-auto my-auto rounded overflow-hidden">
          <MapBoxLocation />
          <Modal
            show={open && orderData.username === authCtx.user_id}
            className="max-w-[500px] w-[350px] md:w-[100%] lg:w-[100%] md:!top-[10%] rounded overflow-hidden "
          >
            <OrderPop
              acceptOrder={acceptOrder}
              image={orderData.image}
              servicename={orderData.servicename}
              address={address}
              rejectOrder={rejectOrder}
              isLoading={isLoading}
            />
          </Modal>
        </div>
      )}
      {accept && (
        <>
          <div className="w-[99%] h-[60vh] sm:w-[80%] sm:h-[calc(100vh-6rem)]  mx-auto my-auto rounded overflow-hidden">
            <DirectionMapBox
              destilatitude={userData.latitude}
              destilongitude={userData.longitude}
            />
          </div>
          <OnAcceptOrder
            name={userData.firstname + " " + userData.lastname}
            address={useraddress}
            mobilenumber={userData.mobilenumber}
            servicename={orderData.servicename}
            image={orderData.image}
            price={orderData.price}
            longitude={userData.longitude}
            latitude={userData.latitude}
            distance={orderData.calcDistance}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
};

export default OrderModelPOPUP;
