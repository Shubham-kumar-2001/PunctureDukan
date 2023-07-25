import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import {
  FullscreenControl,
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Direction from "./Direction";
import { mapAction } from "../../../Store/map-slice";
import { toast } from "react-toastify";
const DirectionMapBox = (props) => {
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
        try {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setTimeout(() => {
                mapRef.current.flyTo({
                  center: [position.coords.longitude, position.coords.latitude],
                });
              }, 200);
              dispatch(
                mapAction.newPlace({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                })
              );
              dispatch(mapAction.setLocation());
            },
            (error) => {
              handleError("Something went wrong getting your position!");
            }
          );
        } catch (err) {
          handleError(err.message);
        }
      }
    } catch (err) {
      handleError(err.message);
    }
  }, [!location.latitude && !location.longitude]);
  console.log(props.originlatitude, "ghsdgj");
  return (
    <Map
      ref={mapRef}
      initialViewState={{
        latitude: props.originlongitude,
        longitude: props.originlatitude,
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
      <Direction
        originlatitude={location.latitude}
        originlongitude={location.longitude}
        destilatitude={props.destilatitude}
        destilongitude={props.destilongitude}
      />
    </Map>
  );
};

export default DirectionMapBox;
