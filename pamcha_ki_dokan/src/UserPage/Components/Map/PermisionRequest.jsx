import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapAction } from "../../../Store/map-slice";
import ButtonForm from "../../../UI/buttonForm";
import ErrorModule from "../../../ErrorModule/ErrorModule";
import MapBoxLocation from "./MapBox";
import Modal from "../../../UI/Modal";
const PermisionRequest = () => {
  const dispatch = useDispatch();
  const renderMap = useSelector((state) => state.location.mapRendering);
  const error = useSelector((state) => state.location.errorMessage);
  // const location = useSelector((state) => state.location.location);
  const isMapRendering = () => {
    dispatch(mapAction.mapOpen());
  };
  const closeMapRendering = () => {
    dispatch(mapAction.mapClose());
  };
  const errorAndRender = () => {
    dispatch(mapAction.mapClose());
    dispatch(mapAction.clearMessage());
  };
  // console.log(location);
  return (
    <>
      {!renderMap && (
        <div className="container flex flex-wrap h-auto mt-4 ml-[2rem] mb-0">
          <ButtonForm
            type="button"
            onClick={isMapRendering}
            buttonContent="Locate Me"
            className="btn-primary text-[#fff] text-[20px] px-[50px] py-[10px]"
          />
        </div>
      )}
      {renderMap && error && (
        <ErrorModule error={error} onClick={errorAndRender} />
      )}
      {renderMap && !error && (
        <Modal
          onClick={closeMapRendering}
          show={renderMap}
          className="w-[100%] h-[70%] md:w-[90%] md:h-[70%] !left-[5%] lg:w-[50%] lg:h-[60%] rounded overflow-hidden"
        >
          <MapBoxLocation />
        </Modal>
      )}
    </>
  );
};

export default PermisionRequest;
