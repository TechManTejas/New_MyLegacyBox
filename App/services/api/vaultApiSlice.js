import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
import {
  BASE_API_URL_LOCAL_SUFFIX,
} from "@env";
import { QUERY_TAGS } from "../../constants/queryTags";

const { manifest } = Constants;

const baseUrl = `http://${manifest.debuggerHost
  .split(":")
  .shift()}${BASE_API_URL_LOCAL_SUFFIX}`;

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/vault`,
  prepareHeaders: (headers, { getState }) => {
    const sessionToken = getState().auth.sessionToken;

    if (sessionToken) {
      headers.set("session_token", sessionToken);
    }

    return headers;
  },
});

export const vaultApiSlice = createApi({
  reducerPath: "vaultApi",
  baseQuery: baseQuery,
  tagTypes: [
    QUERY_TAGS.bank,
    QUERY_TAGS.financialHolding,
    QUERY_TAGS.postal,
    QUERY_TAGS.insurance,
  ],
  endpoints: (builder) => ({}),
});
