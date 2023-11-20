import Constants from "expo-constants";
// import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../../constants/queryTags";
import { rootApiSlice } from "../rootApi";
import { BASE_API_URL, BASE_API_URL_LOCAL_SUFFIX } from "@env";

// const willAdapter = createEntityAdapter({
//   selectId: ({ _id }) => _id,
//   sortComparer: (a, b) => a._id.localeCompare(b._id),
// });

// const initialState = willAdapter.getInitialState();

export const extendedWillApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWill: builder.query({
      query: () => "/wills/will",
      providesTags: [QUERY_TAGS.will],
    }),
    addOrUpdateWill: builder.mutation({
      query: (will) => ({
        url: "/wills",
        method: "PUT",
        body: will,
      }),
      invalidatesTags: [QUERY_TAGS.will],
    }),
    generateWordFileHash: builder.mutation({
      query: () => ({
        url: "/wills/file-hashed-will-id",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});

// const selectWillResponse = extendedWillApiSlice.endpoints.getWill.select();

export const {
  useGetWillQuery,
  useAddOrUpdateWillMutation,
  useGenerateWordFileHashMutation,
} = extendedWillApiSlice;

const baseUrl = `http://${
  Constants.expoGoConfig?.debuggerHost?.split(":")[0]
}${BASE_API_URL_LOCAL_SUFFIX}`;

// const baseUrl = BASE_API_URL

export const generateWordFileWillByHashUrl = `${baseUrl}/wills/word-file/:hashedWillId`;
