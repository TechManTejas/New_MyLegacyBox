import { createEntityAdapter } from "@reduxjs/toolkit";
import { URLSearchParams } from "react-native-url-polyfill";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";

interface cashHoldingType {
  _id: string;
}

const cashHoldingsAdapter = createEntityAdapter<any>({
  selectId: ({ _id }: any) => _id,
  sortComparer: (a: any, b: any) => a._id.localeCompare(a._id),
} as any);

const initialState = cashHoldingsAdapter.getInitialState();

export const cashHoldingApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialHoldingForCash: builder.query({
      query: (filter: any) =>
        `/vault/cash/holdings?${new URLSearchParams(filter)}`,
      transformResponse: (responseData: { data: cashHoldingType[] }) => {
        return cashHoldingsAdapter.setAll(
          initialState,
          responseData?.data || [],
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
      query: ({ ...holding }: any) => ({
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
      query: ({ _id, ...financialHolding }: any) => ({
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
