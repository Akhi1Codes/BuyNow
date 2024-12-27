import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = "https://buynow-backend-iasj.onrender.com"; // Production URL
//  "http://localhost:4000"; // Development URL

export const productApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://buynow-backend-iasj.onrender.com",
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
      providesTags: (id) => [{ type: "Product", id }],
    }),
    productReview: builder.mutation({
      query: (newReview) => ({
        url: "/api/v1/review",
        method: "PUT",
        body: newReview,
        credentials: "include",
      }),
      invalidatesTags: ({ productId }) => [{ type: "Product", id: productId }],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetProductQuery,
  useProductReviewMutation,
} = productApi;
