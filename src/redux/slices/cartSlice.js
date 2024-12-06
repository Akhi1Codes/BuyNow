import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
    NoOfProducts: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (!existingProduct) {
        state.cart.push(action.payload);
        state.NoOfProducts = state.cart.length;
      }
    },
    removeFromCart: (state, action) => {
      console.log(action.payload.id);
      state.cart = state.cart.filter(
        (product) => product._id !== action.payload.id
      );
      state.NoOfProducts = state.cart.length;
    },
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
