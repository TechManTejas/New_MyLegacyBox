import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../constants/queryTags";
import { willApiSlice } from "../api/willApiSlice";

const willAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(b._id),
});

const initialState = willAdapter.getInitialState();

export const extendedWillApiSlice = willApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWill: builder.query({
      query: () => "/will",
      providesTags: [QUERY_TAGS.will]
        
    }),
    addOrUpdateWill: builder.mutation({
      query: (will) => ({
        url: "/",
        method: "PUT",
        body: will,
      }),
      invalidatesTags: [QUERY_TAGS.will]
    }),
    generateWordFileHash: builder.mutation({
      query: () => ({
        url: "/file-hashed-will-id",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});

const selectWillResponse = extendedWillApiSlice.endpoints.getWill.select();

export const {
  useGetWillQuery,
  useAddOrUpdateWillMutation,
  useGenerateWordFileHashMutation
} = extendedWillApiSlice;
