import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://fastap-web-backend-yy8e.vercel.app/",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
  credentials: "include",
});

export const imgQuery = fetchBaseQuery({
    baseUrl: "https://fastap-web-backend-yy8e.vercel.app/",
    prepareHeaders: (headers, { getState }) => {
    return headers;
  },
  credentials: "include",
});

const customBaseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, {
    ...extraOptions,
    credentials: "include",
  });
  return result;
};

export default customBaseQuery;
