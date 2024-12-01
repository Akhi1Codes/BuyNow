import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:4000",
    baseUrl: "https://buynow-66f3.onrender.com",
  }),
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (params) => ({
        url: "/api/v1/products",
        params: {
          ...(params.category && { category: params.category }),
          ...(params.keyword && { keyword: params.keyword }),
        },
      }),
    }),
    getProduct: builder.query({
      query: (id) => `/api/v1/products/${id}`,
    }),
  }),
});

export const { useGetAllProductQuery, useGetProductQuery } = productApi;
