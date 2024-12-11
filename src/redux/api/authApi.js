import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  import.meta.env.NODE_ENV === "production"
    ? "https://buynow-backend-iasj.onrender.com" // Production URL
    : "http://localhost:4000"; // Development URL

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl,
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
      invalidatesTags: ["User"],
    }),
    userRegister: builder.mutation({
      query: (userData) => ({
        url: "/api/v1/register",
        method: "POST",
        body: userData,
        credentials: "include",
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
      providesTags: ["User"],
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
    logoutUser: builder.mutation({
      query: () => ({
        url: "/api/v1/logout",
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation({
      query: (token, password, confirmPassword) => ({
        url: `/api/v1/password/reset/${token}`,
        method: "PUT",
        body: { password, confirmPassword },
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
  useLogoutUserMutation,
  useResetPasswordMutation,
} = authApi;
