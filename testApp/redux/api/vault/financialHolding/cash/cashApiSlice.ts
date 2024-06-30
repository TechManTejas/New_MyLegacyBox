import { createEntityAdapter } from "@reduxjs/toolkit";
import { URLSearchParams } from "react-native-url-polyfill";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";

interface cashHoldingType {
  _id: string;
}

const cashHoldingsAdapter = createEntityAdapter<cashHoldingType>({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(a._id),
});

const initialState = cashHoldingsAdapter.getInitialState();

export const cashHoldingApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getFinancialHoldingForCash: builder.query({
      query: (filter) => `/vault/cash/holdings?${new URLSearchParams(filter)}`,
      transformResponse: (responseData: { data: cashHoldingType[] }) => {
        return cashHoldingsAdapter.setAll(
          initialState,
          responseData?.data || []
        );
      },
      providesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingCashList,
              },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.financialHolding as const,
                id,
              })),
            ]
          : [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingCashList,
              },
            ],
    }),
    addFinancialHoldingForCash: builder.mutation({
      query: ({ ...holding }) => ({
        url: `/vault/cash/holdings`,
        method: "POST",
        body: holding,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingCashList,
              },
            ]
          : [],
    }),
    updateFinancialHoldingForCash: builder.mutation({
      query: ({ _id, ...financialHolding }) => ({
        url: `/vault/cash/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
    }),
  }),
});

export const {
  useGetFinancialHoldingForCashQuery,
  useAddFinancialHoldingForCashMutation,
  useUpdateFinancialHoldingForCashMutation,
} = cashHoldingApiSlice;
