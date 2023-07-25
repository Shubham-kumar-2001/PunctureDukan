import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { mapAction } from "./../../../Store/map-slice";
import ButtonForm from "./../../../UI/buttonForm";

const GetUserLocation = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location.location);
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      handleError("Geolocation not supported");
    }
  };

  const success = (position) => {
    dispatch(
      mapAction.newPlace({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    );
    dispatch(mapAction.setLocation(true));
    handleSuccess("Location updated Successfully");
  };

  const error = () => {
    handleError("Unable to retrieve your location");
  };
  const doNotAllow = () => {
    dispatch(mapAction.setLocation(false));
    handleError("You block your location");
  };

  return (
    <div className="max-w-[300px] flex flex-col justify-center card rounded border-[1] bg-zinc-300">
      <div className="flex items-start w-[100%]">
        <span className="text-[20px] font-[500] ">
          <FontAwesomeIcon icon={faLocationCrosshairs} />
        </span>
        <span className="text-[17px] font-[400]">Enable Your location</span>
      </div>
      <div className="flex items-start justify-center">
        <ButtonForm
          type="button"
          buttonContent="Allow"
          className="btn-primary"
          onClick={handleLocationClick}
        />
        <ButtonForm type="button" buttonContent="Block" onClick={doNotAllow} />
      </div>
      <div>
        <span>{location.longitude}</span>
        <span>{location.latitude}</span>
      </div>
    </div>
  );
};

export default GetUserLocation;
