import { createApi } from "@reduxjs/toolkit/query/react";
import { imgQuery } from "./baseQuery.js";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: imgQuery,
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (data) => ({
                url: '/product/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        getProducts: builder.query({
            query: () => ({
                url: '/product/getProducts',
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: '/product/get',
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
        getProductByCategory: builder.query({
            query: ({ categoryName }) => ({
                url: `/product/getProducts/${categoryName}`,
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
        getProductById: builder.query({
            query: (id) => ({
                url: `/product/getProduct/${id}`,
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `/product/update/${data.get('id')}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/delete/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Product'],
        }),
        deleteTotalProduct: builder.mutation({
            query: (id) => ({
                url: `/product/deleteTotal/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        enableProduct: builder.mutation({
            query: (id) => ({
                url: `/product/enable/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Product'],
        }),
    })
});

export const {
    useCreateProductMutation,
    useGetProductsQuery,
    useGetAllProductsQuery,
    useGetProductByCategoryQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useEnableProductMutation,
    useDeleteTotalProductMutation
} = productApi;
