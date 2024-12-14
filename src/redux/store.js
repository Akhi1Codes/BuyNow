import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import { combineReducers } from "redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "./api/productApi";
import { authApi } from "./api/authApi";
import { orderApi } from "./api/orderApi";
import categoryReducer from "./slices/categorySlice";
import searchReducer from "./slices/searchSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: sessionStorage,
  blacklist: ["category", "search", "cartSlice"],
};

const cartPersistConfig = {
  key: "cart",
  storage: storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const rootReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  category: categoryReducer,
  search: searchReducer,
  authSlice: authReducer,
  cartSlice: persistedCartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productApi.middleware, authApi.middleware, orderApi.middleware),
});

export const persistor = persistStore(store);

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
