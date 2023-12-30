import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes } from "../../constants/queryTags";

interface sessionType {
  auth: {
    sessionToken: string;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_BASE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const sessionToken = (getState() as sessionType).auth.sessionToken;
    if (sessionToken) headers.set("session_token", sessionToken);
    return headers;
  },
});

export const rootApiSlice = createApi({
  reducerPath: "rootApi",
  baseQuery: baseQuery,
  tagTypes,
  endpoints: (builder) => ({}),
});
