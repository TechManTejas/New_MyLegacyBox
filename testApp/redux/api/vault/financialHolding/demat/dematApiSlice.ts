import { createEntityAdapter } from "@reduxjs/toolkit";
import { URLSearchParams } from "react-native-url-polyfill";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";

interface dematHoldingType {
  _id: string;
}

const dematHoldingsAdapter = createEntityAdapter<dematHoldingType>({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(a._id),
});

const initialState = dematHoldingsAdapter.getInitialState();

export const dematHoldingApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialHoldingForDemat: builder.query({
      query: (filter) => `/vault/demats/holdings?${new URLSearchParams(filter)}`,
      transformResponse: (responseData: { data: dematHoldingType[] }) => {
        return dematHoldingsAdapter.setAll(
          initialState,
          responseData?.data || []
        );
      },
      providesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingDematList,
              },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.financialHolding as const,
                id,
              })),
            ]
          : [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingDematList,
              },
            ],
    }),
    addFinancialHoldingForDemat: builder.mutation({
      query: ({ ...holding }) => ({
        url: `/vault/demats/holdings`,
        method: "POST",
        body: holding,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingDematList,
              },
            ]
          : [],
    }),
    updateFinancialHoldingForDemat: builder.mutation({
      query: ({ _id, ...financialHolding }) => ({
        url: `/vault/demats/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
    }),
  }),
});

export const {
  useGetFinancialHoldingForDematQuery,
  useAddFinancialHoldingForDematMutation,
  useUpdateFinancialHoldingForDematMutation,
} = dematHoldingApiSlice;
