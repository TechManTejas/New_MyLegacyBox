import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
import { BASE_API_URL_LOCAL_SUFFIX, BASE_API_URL } from "@env";
import { QUERY_TAGS } from "../../constants/queryTags";

const { manifest } = Constants;

const baseUrl = `http://${manifest.debuggerHost
  .split(":")
  .shift()}${BASE_API_URL_LOCAL_SUFFIX}`;

// const baseUrl = `${BASE_API_URL}`;

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/nominees`,
  prepareHeaders: (headers, { getState }) => {
    const sessionToken = getState().auth.sessionToken;

    if (sessionToken) {
      headers.set("session_token", sessionToken);
    }

    return headers;
  },
});

export const nomineeApiSlice = createApi({
  reducerPath: "nomineeApi",
  baseQuery: baseQuery,
  tagTypes: [QUERY_TAGS.nominee],
  endpoints: (builder) => ({}),
});
