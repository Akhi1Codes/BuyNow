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
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        state.NoOfProducts = state.cart.length;
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product._id !== action.payload.id
      );
      state.NoOfProducts = state.cart.length;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find((product) => product._id === id);

      if (product && quantity > 0) {
        product.quantity = quantity;
      }
    },
  },
});
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
