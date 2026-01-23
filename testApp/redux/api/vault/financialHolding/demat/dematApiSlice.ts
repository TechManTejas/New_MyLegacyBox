import { createEntityAdapter } from "@reduxjs/toolkit";
import { URLSearchParams } from "react-native-url-polyfill";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";

interface dematHoldingType {
  _id: string;
}

const dematHoldingsAdapter = createEntityAdapter<any>({
  selectId: ({ _id }: any) => _id,
  sortComparer: (a: any, b: any) => a._id.localeCompare(a._id),
} as any);

const initialState = dematHoldingsAdapter.getInitialState();

export const dematHoldingApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialHoldingForDemat: builder.query({
      query: (filter: any) =>
        `/vault/demats/holdings?${new URLSearchParams(filter)}`,
      transformResponse: (responseData: { data: dematHoldingType[] }) => {
        return dematHoldingsAdapter.setAll(
          initialState,
          responseData?.data || [],
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
      query: ({ ...holding }: any) => ({
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
      query: ({ _id, ...financialHolding }: any) => ({
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
