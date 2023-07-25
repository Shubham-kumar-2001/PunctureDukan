import React from "react";
import MapBoxLocation from "./MapBox";
const LocateWithIp = () => {
  return (
    <div className="w-[90%] sm:w-[80%] h-[65vh] sm:h-[70vh] mx-auto my-auto rounded overflow-hidden">
      <MapBoxLocation />
    </div>
  );
};

export default LocateWithIp;
