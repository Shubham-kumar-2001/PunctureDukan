import React, { useState } from "react";
import DirectionMapBox from "../../Map/DirectionMapBox";
import OnAcceptOrder from "./OnAccept";
import { decryptData } from "../../../../utility/utility";
import { useNavigate } from "react-router-dom";
import OnAcceptLoading from "./OnAcceptLoading";
const UserOrderData = (props) => {
  const [userData, setUserData] = useState({});
  const [orderData, setOrderData] = useState({});
  const [userOrderAddress, setUserOrderAddress] = useState([]);
  const navigate = useNavigate();

  if (!Object.keys(userData).length) {
    const userOrderData = localStorage.getItem("userData");
    if (userOrderData) {
      const originalUserData = decryptData(userOrderData);
      if (originalUserData) {
        setUserData(originalUserData);
      }
    }
  }
  if (!Object.keys(orderData).length) {
    const providerData = localStorage.getItem("providerData");
    if (providerData) {
      const originalProviderData = decryptData(providerData);
      if (originalProviderData) {
        setOrderData(originalProviderData);
      }
    }
  }
  if (!Object.keys(userOrderAddress).length) {
    const userAddress = localStorage.getItem("userAddress");
    if (userAddress) {
      const originalUserAddress = decryptData(userAddress);
      if (originalUserAddress) {
        setUserOrderAddress(originalUserAddress);
      }
    }
  }
  // console.log(userOrderAddress, "address");
  const onArriveToUSer = () => {
    const data = {
      image: orderData.image,
      price: orderData.price,
      servicename: orderData.servicename,
      name: userData.firstname + " " + userData.lastname,
      address: userOrderAddress,
      mobilenumber: userData.mobilenumber,
      username: userData.username,
    };
    props.setPayment(data);
    localStorage.setItem("verifyotp", true);
    navigate("/serviceprovider/puncturedukan/otpverify");
  };
  return (
    <>
      {!Object.keys(orderData).length && <OnAcceptLoading />}
      {Object.keys(orderData).length && (
        <div className="container ">
          <div className="flex flex-wrap mx-auto flex-col w-[99%] sm:w-[95%] sm:mx-auto md:w-[85%]">
            <div className="w-[99%] h-[60vh] sm:w-[80%] sm:h-[calc(100vh-6rem)]  mx-auto my-auto rounded overflow-hidden">
              <DirectionMapBox
                destilatitude={userData.latitude}
                destilongitude={userData.longitude}
              />
            </div>
            <OnAcceptOrder
              name={userData.firstname + " " + userData.lastname}
              address={userOrderAddress}
              mobilenumber={userData.mobilenumber}
              servicename={orderData.servicename}
              image={orderData.image}
              price={orderData.price}
              longitude={userData.longitude}
              latitude={userData.latitude}
              distance={orderData.calcDistance}
              onArriveToUSer={onArriveToUSer}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrderData;
