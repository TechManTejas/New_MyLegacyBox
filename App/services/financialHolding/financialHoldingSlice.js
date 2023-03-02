import { createEntityAdapter } from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../constants/queryTags";
import { valutApiSlice } from "../api/vaultApiSlice";

const financialHoldingsAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(a._id),
});

const initialState = financialHoldingsAdapter.getInitialState();

export const extendedFinancialHoldingApiSlice = valutApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialHoldingForBank: builder.query({
      query: (parentId) => `/banks/${parentId}/holdings`,
      transformResponse: (responseData) => {
        return financialHoldingsAdapter.setAll(
          initialState,
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
    getFinancialHoldingForPostal: builder.query({
      query: (parentId) => `/postals/${parentId}/holdings`,
      transformResponse: (responseData) => {
        return financialHoldingsAdapter.setAll(
          initialState,
          responseData?.data || []
        );
      },
      providesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.postal,
                id: QUERY_TAGS.financialHoldingPostalList,
              },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.financialHolding,
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
        url: `/postals/${parentId}/holdings`,
        method: "POST",
        body: holding,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.postal,
                id: QUERY_TAGS.financialHoldingPostalList,
              },
            ]
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
  useGetFinancialHoldingForPostalQuery,
  useAddFinancialHoldingForPostalMutation,
  useUpdateFinancialHoldingMutation,
} = extendedFinancialHoldingApiSlice;
