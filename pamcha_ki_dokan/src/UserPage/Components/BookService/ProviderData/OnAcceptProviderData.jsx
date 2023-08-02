import React from "react";
import OnAcceptOrder from "../OnAccept/OnAccept";
import DirectionMapBox from "./../../Map/DirectionMapBox";
const OnAcceptProviderData = (props) => {
  return (
    <div className="container ">
      <div className="flex flex-wrap mx-auto flex-col w-[99%] sm:w-[95%] sm:mx-auto md:w-[85%]">
        <div className="w-[99%] h-[60vh] sm:w-[80%] sm:h-[calc(100vh-6rem)]  mx-auto my-auto rounded overflow-hidden">
          <DirectionMapBox
            destilatitude={props.providerDetail.providerlocation.coordinates[0]}
            destilongitude={
              props.providerDetail.providerlocation.coordinates[1]
            }
          />
        </div>
        <OnAcceptOrder
          name={props.providerDetail.serviceprovidername}
          address={props.providerAddress}
          mobilenumber={props.providerDetail.providermobilenumber}
          servicename={props.providerDetail.servicename}
          image={props.providerDetail.image}
          price={props.providerDetail.price}
          distance={parseFloat(props.providerDetail.distance)}
          otp={props.providerDetail.otp}
          onClick={props.onClick}
        />
      </div>
    </div>
  );
};

export default OnAcceptProviderData;
