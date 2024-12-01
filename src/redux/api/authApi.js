import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:4000",
    baseUrl: "https://buynow-66f3.onrender.com",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    userRegister: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useUserLoginMutation, useUserRegisterMutation } = authApi;
