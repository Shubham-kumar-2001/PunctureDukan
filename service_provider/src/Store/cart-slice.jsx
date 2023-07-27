import { createSlice } from "@reduxjs/toolkit";
const initialCartState = {
  services: [],
  totalQuantity: 0,
  totalCartPrice: 0,
};

const cartSlice = createSlice({
  name: "CartService",
  initialState: initialCartState,
  reducers: {
    addServiceToCart(state, action) {
      const price = action.payload;
      if (!state.totalCartPrice) {
        state.totalCartPrice = price;
        state.totalQuantity++;
      }
      state.totalQuantity++;
      state.totalCartPrice = state.totalCartPrice + price;
    },
    removeServiceToCart(state, action) {
      const price = action.payload;
      if (state.totalQuantity === 1) {
        return;
      }
      state.totalCartPrice = state.totalCartPrice - price;
      state.totalQuantity--;
    },
  },
});

export const cartSliceActions = cartSlice.actions;

export default cartSlice;
