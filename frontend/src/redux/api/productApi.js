import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params: {
          keyword: params?.keyword,
        },
      }),
    }),
    getProductsDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),

    getProductsByCategory: builder.query({
      query: (category) => `/product/${category}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsDetailsQuery,
  useGetProductsByCategoryQuery,
} = productApi;
