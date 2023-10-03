import { createEntityAdapter } from "@reduxjs/toolkit";
import { URLSearchParams } from "react-native-url-polyfill";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";

interface PartnershipHoldingType {
  _id: string;
}

const partnershipHoldingsAdapter =
  createEntityAdapter<PartnershipHoldingType>({
    selectId: ({ _id }) => _id,
    sortComparer: (a, b) => a._id.localeCompare(a._id),
  });

const initialState = partnershipHoldingsAdapter.getInitialState();

export const partnershipHoldingApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialHoldingForPartnership: builder.query({
      query: (filter) =>
        `/vault/partnerships/holdings?${new URLSearchParams(filter)}`,
      transformResponse: (responseData: {
        data: PartnershipHoldingType[];
      }) => {
        return partnershipHoldingsAdapter.setAll(
          initialState,
          responseData?.data || []
        );
      },
      providesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingPartnershipList,
              },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.financialHolding as const,
                id,
              })),
            ]
          : [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingPartnershipList,
              },
            ],
    }),
    addFinancialHoldingForPartnership: builder.mutation({
      query: ({ ...holding }) => ({
        url: `/vault/partnerships/holdings`,
        method: "POST",
        body: holding,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingPartnershipList,
              },
            ]
          : [],
    }),
    updateFinancialHoldingForPartnership: builder.mutation({
      query: ({ _id, ...financialHolding }) => ({
        url: `/vault/partnerships/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
    }),
  }),
});

export const {
  useGetFinancialHoldingForPartnershipQuery,
  useAddFinancialHoldingForPartnershipMutation,
  useUpdateFinancialHoldingForPartnershipMutation,
} = partnershipHoldingApiSlice;
