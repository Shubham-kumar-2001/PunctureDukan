import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import mapSlice from "./map-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    location: mapSlice,
    auth: authSlice,
    cart: cartSlice.reducer,
  },
});

export default store;
