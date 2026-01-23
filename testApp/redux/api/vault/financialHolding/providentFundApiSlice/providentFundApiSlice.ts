import { createEntityAdapter } from "@reduxjs/toolkit";
import { URLSearchParams } from "react-native-url-polyfill";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";

interface ProvidentFundHoldingType {
  _id: string;
}

const providentFundHoldingsAdapter = createEntityAdapter<any>({
  selectId: (model: ProvidentFundHoldingType) => model._id,
  sortComparer: (a: ProvidentFundHoldingType, b: ProvidentFundHoldingType) =>
    a._id.localeCompare(a._id),
} as any);

const initialState = providentFundHoldingsAdapter.getInitialState();

export const providentFundHoldingApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialHoldingForProvidentFund: builder.query({
      query: (filter: any) =>
        `/vault/provident-funds/holdings?${new URLSearchParams(filter)}`,
      transformResponse: (responseData: {
        data: ProvidentFundHoldingType[];
      }) => {
        return providentFundHoldingsAdapter.setAll(
          initialState,
          responseData?.data || [],
        );
      },
      providesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingProvidentFundList,
              },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.financialHolding as const,
                id,
              })),
            ]
          : [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingProvidentFundList,
              },
            ],
    }),
    addFinancialHoldingForProvidentFund: builder.mutation({
      query: ({ ...holding }) => ({
        url: `/vault/provident-funds/holdings`,
        method: "POST",
        body: holding,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingProvidentFundList,
              },
            ]
          : [],
    }),
    updateFinancialHoldingForProvidentFund: builder.mutation({
      query: ({ _id, ...financialHolding }) => ({
        url: `/vault/provident-funds/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
    }),
  }),
});

export const {
  useGetFinancialHoldingForProvidentFundQuery,
  useAddFinancialHoldingForProvidentFundMutation,
  useUpdateFinancialHoldingForProvidentFundMutation,
} = providentFundHoldingApiSlice;
