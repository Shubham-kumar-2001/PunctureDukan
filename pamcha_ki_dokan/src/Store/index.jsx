import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import mapSlice from "./map-slice";

const store = configureStore({
  reducer: {
    location: mapSlice,
    auth: authSlice,
  },
});

export default store;
