import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../constants/queryTags";
import { nomineeApiSlice } from "../api/nomineeApiSlice";

const nomineeAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(b._id),
});

const initialState = nomineeAdapter.getInitialState();

export const extendedNomineeApiSlice = nomineeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNominees: builder.query({
      query: () => "/",
      transformResponse: (responseData) => {
        return nomineeAdapter.setAll(initialState, responseData?.data || []);
      },
      providesTags: (result) =>
        result
          ? [
              { type: QUERY_TAGS.nominee, id: QUERY_TAGS.nomineeList },
              ...result.ids.map((id) => ({ type: QUERY_TAGS.nominee, id })),
            ]
          : [{ type: QUERY_TAGS.nominee, id: QUERY_TAGS.nomineeList }],
    }),
    addNominee: builder.mutation({
      query: (nominee) => ({
        url: "/",
        method: "POST",
        body: nominee,
      }),
      invalidatesTags: (result) =>
        result
          ? [{ type: QUERY_TAGS.nominee, id: QUERY_TAGS.nomineeList }]
          : [],
    }),
  }),
  overrideExisting: true,
});

const selectNomineesResponse =
  extendedNomineeApiSlice.endpoints.getNominees.select();

const selectNominees = createSelector(
  selectNomineesResponse,
  (state) => state.data
);

export const { selectById: selectNomineeById } = nomineeAdapter.getSelectors(
  (state) => selectNominees(state) ?? initialState
);

export const { useGetNomineesQuery, useAddNomineeMutation } =
  extendedNomineeApiSlice;
