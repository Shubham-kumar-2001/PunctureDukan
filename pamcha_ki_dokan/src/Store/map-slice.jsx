import { createSlice } from "@reduxjs/toolkit";

const initialLocationState = {
  location: {
    latitude: 12,
    longitude: 12,
  },
  mapRendering: false,
  isLocationEnable: false,
  provider: {
    latitude: 0,
    longitude: 0,
  },
};

const mapSlice = createSlice({
  name: "location",
  initialState: initialLocationState,
  reducers: {
    newPlace(state, action) {
      state.location = action.payload;
    },
    providerNewPlace(state, action) {
      state.provider = action.payload;
    },
    mapOpen(state) {
      state.mapRendering = true;
    },
    mapClose(state) {
      state.mapRendering = false;
    },
    setLocation(state, action) {
      state.isLocationEnable = action.payload;
    },
  },
});

export const mapAction = mapSlice.actions;

export default mapSlice.reducer;
