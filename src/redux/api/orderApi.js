import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = "https://buynow-backend-iasj.onrender.com"; // Production URL
//  "http://localhost:4000"; // Development URL

export const orderApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://buynow-backend-iasj.onrender.com",
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    userCheckout: builder.mutation({
      query: (cartProducts) => ({
        url: "/api/v1/checkout",
        method: "POST",
        body: cartProducts,
        credentials: "include",
      }),
    }),
    newOrder: builder.mutation({
      query: (order) => ({
        url: "/api/v1/order/new",
        method: "POST",
        body: order,
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),
    userOrders: builder.query({
      query: () => ({
        url: "/api/v1/orders/me",
        credentials: "include",
      }),
      providesTags: ["Order"],
    }),
    userOrderDetails: builder.query({
      query: (id) => ({
        url: `/api/v1/order/${id}`,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useUserCheckoutMutation,
  useNewOrderMutation,
  useUserOrdersQuery,
  useUserOrderDetailsQuery,
} = orderApi;
