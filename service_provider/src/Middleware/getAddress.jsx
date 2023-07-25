import axios from "axios";
export const fetchAddress = async ({ latitude, longitude }) => {
  try {
    const data = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiYW5zaHU5NjAiLCJhIjoiY2xpc2h1bWZ0MTQyaDNsbnFrdnB2ZHk2aCJ9.ZWMlj-AyBEl8KfbzBVFLWw`
    );
    return data.data.features[0].place_name;
  } catch (err) {
    return err;
  }
};
