import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../constants/queryTags";
import { valutApiSlice } from "../api/vaultApiSlice";

const postalAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(b._id),
});

const initialState = postalAdapter.getInitialState();

export const extendedPostalApiSlice = valutApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostals: builder.query({
      query: () => "/postals",
      transformResponse: (responseData) => {
        return postalAdapter.setAll(initialState, responseData?.data || []);
      },
      providesTags: (result) =>
        result
          ? [
              { type: QUERY_TAGS.postal, id: QUERY_TAGS.postalList },
              ...result.ids.map((id) => ({ type: QUERY_TAGS.postal, id })),
            ]
          : [{ type: QUERY_TAGS.postal, id: QUERY_TAGS.postalList }],
    }),
    addPostal: builder.mutation({
      query: (postal) => ({
        url: "/postals",
        method: "POST",
        body: postal,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: QUERY_TAGS.postal, id: QUERY_TAGS.postalList }] : [],
    }),
    updatePostal: builder.mutation({
      query: ({ _id, ...postal }) => ({
        url: `/postals/${_id}`,
        method: "PUT",
        body: postal,
      }),
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: QUERY_TAGS.postal, id: arg._id }] : [],
    }),
  }),
  overrideExisting: true,
});

const selectPostalsResponse = extendedPostalApiSlice.endpoints.getPostals.select();

const selectPostals = createSelector(selectPostalsResponse, (state) => state.data);

export const { selectById: selectPostalById } = postalAdapter.getSelectors(
  (state) => selectPostals(state) ?? initialState
);

export const { useGetPostalsQuery, useAddPostalMutation, useUpdatePostalMutation } =
  extendedPostalApiSlice;
