import Constants from "expo-constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL, BASE_API_URL_LOCAL_SUFFIX } from "@env";
import { tagTypes } from "../../constants/queryTags";

interface sessionType {
  auth: {
    sessionToken: string;
  };
}

const baseUrl = `http://${
  Constants.expoGoConfig?.debuggerHost?.split(":")[0]
}${BASE_API_URL_LOCAL_SUFFIX}`;

// const baseUrl = BASE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
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
