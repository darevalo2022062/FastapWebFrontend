import { createApi } from "@reduxjs/toolkit/query/react";
import { imgQuery } from "./baseQuery.js";

export const colorApi = createApi({
    reducerPath: 'colorApi',
    baseQuery: imgQuery,
    tagTypes: ['Color'],
    endpoints: (builder) => ({
        createColor: builder.mutation({
            query: (data) => ({
                url: '/color/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Color'],
        }),
        getColor: builder.query({
            query: () => ({
                url: '/color/getColor',
                method: 'GET',
            }),
            providesTags: ['Color'],
        }),
        getAllColors: builder.query({
            query: () => ({
                url: '/color/get',
                method: 'GET',
            }),
            providesTags: ['Color'],
        }),
        updateColor: builder.mutation({
            query: (data) => ({
                url: `/color/update/${data.get('id')}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Color'],
        }),
        deleteColor: builder.mutation({
            query: (id) => ({
                url: `/color/delete/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Color'],
        }),
        deleteTotalColor: builder.mutation({
            query: (id) => ({
                url: `/color/deleteTotal/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Color'],
        }),
        enableColor: builder.mutation({
            query: (id) => ({
                url: `/color/enable/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Color'],
        }),
    })
});

export const {
    useCreateColorMutation,
    useGetColorQuery,
    useGetAllColorsQuery,
    useUpdateColorMutation,
    useDeleteColorMutation,
    useEnableColorMutation,
    useDeleteTotalColorMutation,
} = colorApi;
