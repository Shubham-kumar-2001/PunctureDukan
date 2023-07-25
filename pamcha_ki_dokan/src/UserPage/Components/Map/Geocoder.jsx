import { useControl } from "react-map-gl";
import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useDispatch } from "react-redux";
import { mapAction } from "./../../../Store/map-slice";
const Geocoder = () => {
  const dispatch = useDispatch();
  const ctrl = new MapBoxGeocoder({
    accessToken: `${process.env.REACT_APP_MAPBOX}`,
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    dispatch(
      mapAction.newPlace({
        latitude: coords[1],
        longitude: coords[0],
      })
    );
    dispatch(mapAction.setLocation());
  });
  return null;
};

export default Geocoder;
