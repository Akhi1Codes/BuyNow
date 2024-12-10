import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  import.meta.env.NODE_ENV === "PRODUCTION"
    ? "https://buynow-backend-iasj.onrender.com" // Production URL
    : "http://localhost:4000"; // Development URL

export const productApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl,
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
