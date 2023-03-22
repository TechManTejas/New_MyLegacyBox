import { createEntityAdapter } from "@reduxjs/toolkit";
import { URLSearchParams } from "react-native-url-polyfill";
import { QUERY_TAGS } from "../../constants/queryTags";
import { vaultApiSlice } from "../api/vaultApiSlice";

const financialHoldingsAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(a._id),
});

const initialState = financialHoldingsAdapter.getInitialState();

export const extendedFinancialHoldingApiSlice = vaultApiSlice.injectEndpoints({
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
    updateFinancialHoldingForBank: builder.mutation({
      query: ({ parentId, _id, ...financialHolding }) => ({
        url: `/banks/${parentId}/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
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
                type: QUERY_TAGS.financialHolding,
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
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingPostalList,
              },
            ]
          : [],
    }),
    updateFinancialHoldingForPostal: builder.mutation({
      query: ({ parentId, _id, ...financialHolding }) => ({
        url: `/postals/${parentId}/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
    }),
    getFinancialHoldingForInsurance: builder.query({
      query: (parentId) => `/insurances/${parentId}/holdings`,
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
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingInsuranceList,
              },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.financialHolding,
                id,
              })),
            ]
          : [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingInsuranceList,
              },
            ],
    }),
    addFinancialHoldingForInsurance: builder.mutation({
      query: ({ parentId, ...holding }) => ({
        url: `/insurances/${parentId}/holdings`,
        method: "POST",
        body: holding,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingInsuranceList,
              },
            ]
          : [],
    }),
    updateFinancialHoldingForInsurance: builder.mutation({
      query: ({ parentId, _id, ...financialHolding }) => ({
        url: `/insurances/${parentId}/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
    }),
    getFinancialHoldingForProvidentFund: builder.query({
      query: (filter) =>
        `/provident-funds/holdings?${new URLSearchParams(filter)}`,
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
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingProvidentFundList,
              },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.financialHolding,
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
        url: `/provident-funds/holdings`,
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
        url: `/provident-funds/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
    }),
    getFinancialHoldingForDemat: builder.query({
      query: (filter) => `/demats/holdings?${new URLSearchParams(filter)}`,
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
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingDematList,
              },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.financialHolding,
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
        url: `/demats/holdings`,
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
        url: `/demats/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
    }),
    getFinancialHoldingForRealEstate: builder.query({
      query: (filter) =>
        `/real-estates/holdings?${new URLSearchParams(filter)}`,
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
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingRealEstateList,
              },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.financialHolding,
                id,
              })),
            ]
          : [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingRealEstateList,
              },
            ],
    }),
    addFinancialHoldingForRealEstate: builder.mutation({
      query: ({ ...holding }) => ({
        url: `/real-estates/holdings`,
        method: "POST",
        body: holding,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingRealEstateList,
              },
            ]
          : [],
    }),
    updateFinancialHoldingForRealEstate: builder.mutation({
      query: ({ _id, ...financialHolding }) => ({
        url: `/real-estates/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
    }),
    getFinancialHoldingForCash: builder.query({
      query: (filter) => `/cash/holdings?${new URLSearchParams(filter)}`,
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
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingCashList,
              },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.financialHolding,
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
        url: `/cash/holdings`,
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
        url: `/cash/holdings/${_id}`,
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
  useUpdateFinancialHoldingForBankMutation,
  useGetFinancialHoldingForPostalQuery,
  useAddFinancialHoldingForPostalMutation,
  useUpdateFinancialHoldingForPostalMutation,
  useGetFinancialHoldingForInsuranceQuery,
  useAddFinancialHoldingForInsuranceMutation,
  useUpdateFinancialHoldingForInsuranceMutation,
  useGetFinancialHoldingForProvidentFundQuery,
  useAddFinancialHoldingForProvidentFundMutation,
  useUpdateFinancialHoldingForProvidentFundMutation,
  useGetFinancialHoldingForDematQuery,
  useAddFinancialHoldingForDematMutation,
  useUpdateFinancialHoldingForDematMutation,
  useGetFinancialHoldingForRealEstateQuery,
  useAddFinancialHoldingForRealEstateMutation,
  useUpdateFinancialHoldingForRealEstateMutation,
  useGetFinancialHoldingForCashQuery,
  useAddFinancialHoldingForCashMutation,
  useUpdateFinancialHoldingForCashMutation,
} = extendedFinancialHoldingApiSlice;
