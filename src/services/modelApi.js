import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery.js";

export const modelApi = createApi({
    reducerPath: 'modelApi',
    baseQuery: baseQuery,
    tagTypes: ['Model'], 
    endpoints: (builder) => ({
        createModel: builder.mutation({
            query: (data) => ({
                url: '/model/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Model'], 
        }),
        getModel: builder.query({
            query: () => ({
                url: '/model/getModel',
                method: 'GET',
            }),
            providesTags: ['Model'], 
        }),
        getAllModels: builder.query({
            query: () => ({
                url: '/model/get',
                method: 'GET',
            }),
            providesTags: ['Model'],
        }),
        updateModel: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/model/update/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Model'], 
        }),
        deleteModel: builder.mutation({
            query: (id) => ({
                url: `/model/delete/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Model'],
        }),
        enableModel: builder.mutation({
            query: (id) => ({
                url: `/model/enable/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Model'], 
        }),
    })
});

export const {
    useCreateModelMutation,
    useGetModelQuery,
    useGetAllModelsQuery,
    useUpdateModelMutation,
    useDeleteModelMutation,
    useEnableModelMutation
} = modelApi;
