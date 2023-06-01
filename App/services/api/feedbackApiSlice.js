import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
import { BASE_API_URL_LOCAL_SUFFIX, BASE_API_URL } from "@env";
import { QUERY_TAGS } from "../../constants/queryTags";

const { manifest } = Constants;

// const baseUrl = `http://${manifest.debuggerHost
//   .split(":")
//   .shift()}${BASE_API_URL_LOCAL_SUFFIX}`;
  
const baseUrl = `${BASE_API_URL}`;

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/feedbacks`,
  prepareHeaders: (headers, { getState }) => {
    const sessionToken = getState().auth.sessionToken;

    if (sessionToken) {
      headers.set("session_token", sessionToken);
    }

    return headers;
  },
});

export const feedbackApiSlice = createApi({
  reducerPath: "feedbackApi",
  baseQuery: baseQuery,
  tagTypes: ["feedback"],
  endpoints: (builder) => ({
    addFeedback: builder.mutation({
      query: (feedback) => ({
        url: "/",
        method: "POST",
        body: feedback,
      }),
      invalidatesTags: "feedback",
    }),
  }),
});

export const { useAddFeedbackMutation } = feedbackApiSlice;
