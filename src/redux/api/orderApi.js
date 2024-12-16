import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = "https://buynow-backend-iasj.onrender.com"; // Production URL
//  "http://localhost:4000"; // Development URL

export const orderApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://buynow-backend-iasj.onrender.com",
  }),
  endpoints: (builder) => ({
    userCheckout: builder.mutation({
      query: (cartProducts) => ({
        url: "/api/v1/checkout",
        method: "POST",
        body: cartProducts,
        credentials: "include",
      }),
    }),
  }),
});

export const { useUserCheckoutMutation } = orderApi;