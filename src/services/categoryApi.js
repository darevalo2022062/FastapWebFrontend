import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./baseQuery.js";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    getCategory: builder.query({
      query: () => ({
        url: "/category/getCategory",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: "/category/get",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/category/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Category"],
    }),
    enableCategory: builder.mutation({
      query: (id) => ({
        url: `/category/enable/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useEnableCategoryMutation,
} = categoryApi;
