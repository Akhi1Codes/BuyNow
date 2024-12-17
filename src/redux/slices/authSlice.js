import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    userDetails: null,
    token: null,
    orderDetails: null,
    isAuthenticated: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = !!token;
    },
    setAddress: (state, action) => {
      state.userDetails = action.payload;
    },
    setOrder: (state, action) => {
      state.orderDetails = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userDetails = null;
      state.isAuthenticated = false;
      state.orderDetails = null;
    },
  },
});

export const { setCredentials, setAddress, setOrder, logout } =
  authSlice.actions;
export default authSlice.reducer;
