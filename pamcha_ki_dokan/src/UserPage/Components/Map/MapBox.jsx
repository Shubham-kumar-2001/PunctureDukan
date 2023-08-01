import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import {
  FullscreenControl,
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocoder from "./Geocoder";
import { mapAction } from "../../../Store/map-slice";
import { toast } from "react-toastify";
const MapBoxLocation = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location.location);
  const mapRef = useRef();
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
  useEffect(() => {
    try {
      if (!navigator.geolocation) {
        return handleError("Geolocation not supported");
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            try {
              setTimeout(() => {
                mapRef.current.flyTo({
                  center: [position.coords.longitude, position.coords.latitude],
                });
              }, 200);
            } catch (err) {}
            dispatch(
              mapAction.newPlace({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              })
            );
            dispatch(mapAction.setLocation());
            handleSuccess("Location updated Successfully");
          },
          (error) => {
            handleError("Something went wrong getting your position!");
          }
        );
      }
    } catch (err) {
      handleError(err.message);
    }
  }, [!location.latitude && !location.longitude]);
  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: location.latitude,
          longitude: location.longitude,
          zoom: 13,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={`${process.env.REACT_APP_MAPBOX}`}
      >
        <Marker
          latitude={location.latitude}
          longitude={location.longitude}
          draggable
          onDrag={(e) =>
            dispatch(
              mapAction.newPlace({
                latitude: e.lngLat.lat,
                longitude: e.lngLat.lng,
              })
            )
          }
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="bottom-right"
          trackUserLocation="true"
          onGeolocate={(e) =>
            dispatch(
              mapAction.newPlace({
                latitude: e.coords.latitude,
                longitude: e.coords.longitude,
              })
            )
          }
          showAccuracyCircle="true"
          showUserHeading="true"
        />
        <FullscreenControl position="bottom-right" />
        <Geocoder />
      </Map>
    </>
  );
};

export default MapBoxLocation;
