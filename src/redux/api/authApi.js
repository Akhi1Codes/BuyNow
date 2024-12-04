import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:4000",
    baseUrl: "https://buynow-backend-iasj.onrender.com",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    userRegister: builder.mutation({
      query: (userData) => ({
        url: "/api/v1/register",
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
    passwordForgot: builder.mutation({
      query: (email) => ({
        url: "/api/v1/password/forgot",
        method: "POST",
        body: email,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/api/v1/me",
      }),
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/api/v1/me/update",
        method: "PUT",
        body: userData,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    updateUserPassword: builder.mutation({
      query: (passwords) => ({
        url: "/api/v1/password/update",
        method: "PUT",
        body: passwords,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  usePasswordForgotMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
} = authApi;
