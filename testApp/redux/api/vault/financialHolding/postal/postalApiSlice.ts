import { createEntityAdapter } from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";

interface PostalHoldingType {
  _id: string;
}

const postalHoldingsAdapter = createEntityAdapter<PostalHoldingType>({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(a._id),
});

const initialState = postalHoldingsAdapter.getInitialState();

export const postalHoldingApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialHoldingForPostal: builder.query({
      query: (parentId) => `/vault/postals/${parentId}/holdings`,
      transformResponse: (responseData: { data: PostalHoldingType[] }) => {
        return postalHoldingsAdapter.setAll(
          initialState,
          responseData?.data || []
        );
      },
      providesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingPostalList,
              },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.financialHolding as const,
                id,
              })),
            ]
          : [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingPostalList,
              },
            ],
    }),
    addFinancialHoldingForPostal: builder.mutation({
      query: ({ parentId, ...holding }) => ({
        url: `/vault/postals/${parentId}/holdings`,
        method: "POST",
        body: holding,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingPostalList,
              },
            ]
          : [],
    }),
    updateFinancialHoldingForPostal: builder.mutation({
      query: ({ parentId, _id, ...financialHolding }) => ({
        url: `/vault/postals/${parentId}/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
    }),
  }),
});

export const {
  useGetFinancialHoldingForPostalQuery,
  useAddFinancialHoldingForPostalMutation,
  useUpdateFinancialHoldingForPostalMutation,
} = postalHoldingApiSlice;
