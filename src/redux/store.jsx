import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    auth: authSlice,
    product: productSlice,
  },
});

export default store;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
