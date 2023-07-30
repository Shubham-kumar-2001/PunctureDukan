import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useHttpClient } from "../../../../Hooks/http-hook";
import { useRef } from "react";
import OnAcceptLoading from "../OnAccept/OnAcceptLoading";
import OnAcceptProviderData from "./OnAcceptProviderData";
import Child from "./../../test/child";
import { decryptData, encryptData } from "./../../../../utility/utility";
import { useNavigate } from "react-router-dom";
const ProviderDetail = () => {
  const [providerDetail, setProviderDetail] = useState({});
  const { sendRequest: providerSendRequest } = useHttpClient();
  const navigate = useNavigate();
  const [providerAddress, setProviderAddress] = useState({});
  const intervalRef = useRef(null);
  localStorage.setItem("dog", true);
  if (!Object.keys(providerDetail).length) {
    const providerData = localStorage.getItem("providerServiceData");
    if (providerData) {
      const originalProviderData = decryptData(providerData);
      if (originalProviderData) {
        setProviderDetail(originalProviderData);
      }
    }
  }
  if (!Object.keys(providerAddress).length) {
    const providerAddress = localStorage.getItem("providerServiceAddress");
    if (providerAddress) {
      const originalProviderAddress = decryptData(providerAddress);
      if (originalProviderAddress) {
        setProviderAddress(originalProviderAddress);
      }
    }
  }
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
  const fetchProviderDetail = async () => {
    try {
      const providerData = await providerSendRequest(
        "http://localhost:2020/api/puncturedukan/auth/userorderdetail"
      );
      const { success, message, userOrderdata } = providerData;
      //   console.log(userOrderdata, "datatadtadtadtda");
      if (success) {
        const providerEncryptedAData = encryptData(userOrderdata);
        localStorage.setItem("providerServiceData", providerEncryptedAData);
        const useraddr = await axios.get(
          `${process.env.REACT_APP_ADDRESS}${userOrderdata.providerlocation.coordinates[0]},${userOrderdata.providerlocation.coordinates[1]}.json?access_token=${process.env.REACT_APP_MAPBOX}`
        );
        const providerServiceAddress = encryptData(
          useraddr.data.features[0].place_name
        );
        localStorage.setItem("providerServiceAddress", providerServiceAddress);
        handleSuccess(message);
      }
    } catch (err) {}
  };
  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      fetchProviderDetail();
    }, 1500);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  const paymentsHandler = () => {
    localStorage.removeItem("providerServiceData");
    localStorage.removeItem("providerServiceAddress");
    navigate("/");
  };
  //   console.log(providerDetail, "detail", Object.keys(providerDetail).length);
  return (
    <>
      {!Object.keys(providerDetail).length && <OnAcceptLoading />}
      {Object.keys(providerDetail).length && (
        <div>
          <OnAcceptProviderData
            providerDetail={providerDetail}
            providerAddress={providerAddress}
            onClick={paymentsHandler}
          />
          <Child
            providerDetail={providerDetail}
            currentTimer={intervalRef.current}
          />
        </div>
      )}
    </>
  );
};

export default ProviderDetail;
