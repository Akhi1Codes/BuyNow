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
      }),
      invalidatesTags: ["User"],
    }),
    userRegister: builder.mutation({
      query: (userData) => ({
        url: "/api/v1/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    passwordForgot: builder.mutation({
      query: (email) => ({
        url: "/api/v1/password/forgot",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["User"],
    }),
    getUser: builder.query({
      query: () => ({
        url: "/api/v1/me",
        credentials: "include",
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
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  usePasswordForgotMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = authApi;