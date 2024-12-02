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
import { combineReducers } from "redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "./api/productApi";
import { authApi } from "./api/authApi";
import categoryReducer from "./slices/categorySlice";
import searchReducer from "./slices/searchSlice";
import authReducer from "./slices/authSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["category", "search", "authApi.reducerPath.userRegister"],
};

const rootReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  category: categoryReducer,
  search: searchReducer,
  authSlice: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productApi.middleware, authApi.middleware),
});

export const persistor = persistStore(store);

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
