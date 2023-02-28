import { createEntityAdapter } from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../constants/queryTags";
import { valutApiSlice } from "../api/vaultApiSlice";

const financialHoldingsBankAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(a._id),
});

const initialBankState = financialHoldingsBankAdapter.getInitialState();

export const extendedFinancialHoldingApiSlice = valutApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialHoldingForBank: builder.query({
      query: (parentId) => `/banks/${parentId}/holdings`,
      transformResponse: (responseData) => {
        return financialHoldingsBankAdapter.setAll(
          initialBankState,
          responseData?.data || []
        );
      },
      providesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.bank,
                id: QUERY_TAGS.financialHoldingBankList,
              },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.financialHolding,
                id,
              })),
            ]
          : [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingBankList,
              },
            ],
    }),
    addFinancialHoldingForBank: builder.mutation({
      query: ({ parentId, ...holding }) => ({
        url: `/banks/${parentId}/holdings`,
        method: "POST",
        body: holding,
      }),
      invalidatesTags: (result) =>
        result
          ? [{ type: QUERY_TAGS.bank, id: QUERY_TAGS.financialHoldingBankList }]
          : [],
    }),
    updateFinancialHolding: builder.mutation({
      query: ({ _id, ...financialHolding }) => ({
        url: `/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
    }),
  }),
});

export const {
  useGetFinancialHoldingForBankQuery,
  useAddFinancialHoldingForBankMutation,
  useUpdateFinancialHoldingMutation,
} = extendedFinancialHoldingApiSlice;
