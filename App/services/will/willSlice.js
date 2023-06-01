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
    getWills: builder.query({
      query: () => "/",
      transformResponse: (responseData) => {
        return willAdapter.setAll(initialState, responseData?.data || []);
      },
      providesTags: (result) =>
        result
          ? [
              { type: QUERY_TAGS.will, id: QUERY_TAGS.willList },
              ...result.ids.map((id) => ({ type: QUERY_TAGS.will, id })),
            ]
          : [{ type: QUERY_TAGS.will, id: QUERY_TAGS.willList }],
    }),
    addWill: builder.mutation({
      query: (will) => ({
        url: "/",
        method: "POST",
        body: will,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: QUERY_TAGS.will, id: QUERY_TAGS.willList }] : [],
    }),
    generateWordHashByWillId: builder.mutation({
      query: (_id) => ({
        url: `file-hashed-will-id/${_id}`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});

const selectWillsResponse = extendedWillApiSlice.endpoints.getWills.select();

const selectWills = createSelector(selectWillsResponse, (state) => state.data);

export const { selectById: selectWillById } = willAdapter.getSelectors(
  (state) => selectWills(state) ?? initialState
);

export const {
  useGetWillsQuery,
  useAddWillMutation,
  useGenerateWordHashByWillIdMutation,
} = extendedWillApiSlice;
