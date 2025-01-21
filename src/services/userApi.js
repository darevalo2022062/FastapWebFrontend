import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./baseQuery.js";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/user/modify",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: "/user/delete",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    readUser: builder.query({
      query: () => ({
        url: "/user/get",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    enableUser: builder.mutation({
      query: (id) => ({
        url: `/user/enable/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    validateSession: builder.query({
      query: () => ({
        url: "/user/validateSession",
        method: "GET",
      }),
    }),
    closeSession: builder.mutation({
      query: () => ({
        url: "/user/closeSession",
        method: "POST",
      }),
    }),
    checkAccount: builder.mutation({
      query: (authorization) => ({
        url: `/user/confirm-email/${authorization}`,
        method: 'POST',
      }),
    }),
    
    recovery: builder.mutation({
      query: (data) => ({
        url: `/user/recovery`,
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/user/change-password`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRecoveryMutation,
  useCreateUserMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useReadUserQuery,
  useEnableUserMutation,
  useValidateSessionQuery,
  useCloseSessionMutation,
  useCheckAccountMutation,
  useChangePasswordMutation,
} = userApi;
