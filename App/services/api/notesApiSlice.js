import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "@env";
import { QUERY_TAGS } from "../../constants/queryTags";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_API_URL}/notes`,
  prepareHeaders: (headers, { getState }) => {
    const sessionToken = getState().auth.sessionToken;
    if (sessionToken) headers.set("session_token", sessionToken);
    return headers;
  },
});

export const notesApiSlice = createApi({
  reducerPath: "notesApi",
  baseQuery: baseQuery,
  tagTypes: [
    QUERY_TAGS.notes
  ],
  endpoints: (builder) => ({}),
});
