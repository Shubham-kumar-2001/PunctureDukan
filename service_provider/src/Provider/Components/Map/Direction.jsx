import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { useControl } from "react-map-gl";
const Direction = (props) => {
  // console.log(props);
  const direction = new MapboxDirections({
    accessToken: `${process.env.REACT_APP_MAPBOX}`,
    unit: "metric",
    profile: "mapbox/driving",
    interactive: false,
    controls: {
      inputs: false,
      instructions: false,
      profileSwitcher: false,
    },
  });
  direction.setOrigin([props.originlongitude, props.originlatitude]);
  direction.setDestination([props.destilatitude, props.destilongitude]);
  useControl(() => direction);
  return null;
};

export default Direction;
