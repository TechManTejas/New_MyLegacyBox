import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
import { BASE_API_URL } from "@env";
import { QUERY_TAGS } from "../../constants/queryTags";

const { expoConfig } = Constants;

// DONOT REMOVE THE BOTTOM COMMENTED LINES
// const baseUrl = `http://${expoConfig.hostUri
//   .split(":")
//   .shift()}${BASE_API_URL_LOCAL_SUFFIX}`;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_API_URL}/personal-info`,
  prepareHeaders: (headers, { getState }) => {
    const sessionToken = getState().auth.sessionToken;

    if (sessionToken) {
      headers.set("session_token", sessionToken);
    }

    return headers;
  },
});

export const personalInfoApiSlice = createApi({
  reducerPath: "personalInfoApi",
  baseQuery: baseQuery,
  tagTypes: [
    QUERY_TAGS.personalInfo
  ],
  endpoints: (builder) => ({}),
});
