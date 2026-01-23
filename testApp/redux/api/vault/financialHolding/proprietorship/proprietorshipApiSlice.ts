import { createEntityAdapter } from "@reduxjs/toolkit";
import { URLSearchParams } from "react-native-url-polyfill";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";

interface ProprietorshipHoldingType {
  _id: string;
}

const proprietorshipHoldingsAdapter = createEntityAdapter<any>({
  selectId: (model: ProprietorshipHoldingType) => model._id,
  sortComparer: (a: ProprietorshipHoldingType, b: ProprietorshipHoldingType) =>
    a._id.localeCompare(a._id),
} as any);

const initialState = proprietorshipHoldingsAdapter.getInitialState();

export const proprietorshipHoldingApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialHoldingForProprietorship: builder.query({
      query: (filter: any) =>
        `/vault/proprietorships/holdings?${new URLSearchParams(filter)}`,
      transformResponse: (responseData: {
        data: ProprietorshipHoldingType[];
      }) => {
        return proprietorshipHoldingsAdapter.setAll(
          initialState,
          responseData?.data || [],
        );
      },
      providesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingProprietorshipList,
              },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.financialHolding as const,
                id,
              })),
            ]
          : [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingProprietorshipList,
              },
            ],
    }),
    addFinancialHoldingForProprietorship: builder.mutation({
      query: ({ ...holding }) => ({
        url: `/vault/proprietorships/holdings`,
        method: "POST",
        body: holding,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingProprietorshipList,
              },
            ]
          : [],
    }),
    updateFinancialHoldingForProprietorship: builder.mutation({
      query: ({ _id, ...financialHolding }) => ({
        url: `/vault/proprietorships/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
    }),
  }),
});

export const {
  useGetFinancialHoldingForProprietorshipQuery,
  useAddFinancialHoldingForProprietorshipMutation,
  useUpdateFinancialHoldingForProprietorshipMutation,
} = proprietorshipHoldingApiSlice;
