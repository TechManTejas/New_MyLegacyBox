import { createEntityAdapter } from "@reduxjs/toolkit";
import { URLSearchParams } from "react-native-url-polyfill";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";

interface PrivateLimitedCompanyHoldingType {
  _id: string;
}

const privateLimitedCompanyHoldingsAdapter =
  createEntityAdapter<PrivateLimitedCompanyHoldingType>({
    selectId: ({ _id }) => _id,
    sortComparer: (a, b) => a._id.localeCompare(a._id),
  });

const initialState = privateLimitedCompanyHoldingsAdapter.getInitialState();

export const privateLimitedCompanyHoldingApiSlice =
  rootApiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getFinancialHoldingForPrivateLimitedCompany: builder.query({
        query: (filter) =>
          `/vault/private-limited-companies/holdings?${new URLSearchParams(
            filter
          )}`,
        transformResponse: (responseData: {
          data: PrivateLimitedCompanyHoldingType[];
        }) => {
          return privateLimitedCompanyHoldingsAdapter.setAll(
            initialState,
            responseData?.data || []
          );
        },
        providesTags: (result) =>
          result
            ? [
                {
                  type: QUERY_TAGS.financialHolding,
                  id: QUERY_TAGS.financialHoldingPrivateLimitedCompanyList,
                },
                ...result.ids.map((id) => ({
                  type: QUERY_TAGS.financialHolding as const,
                  id,
                })),
              ]
            : [
                {
                  type: QUERY_TAGS.financialHolding,
                  id: QUERY_TAGS.financialHoldingPrivateLimitedCompanyList,
                },
              ],
      }),
      addFinancialHoldingForPrivateLimitedCompany: builder.mutation({
        query: ({ ...holding }) => ({
          url: `/vault/private-limited-companies/holdings`,
          method: "POST",
          body: holding,
        }),
        invalidatesTags: (result) =>
          result
            ? [
                {
                  type: QUERY_TAGS.financialHolding,
                  id: QUERY_TAGS.financialHoldingPrivateLimitedCompanyList,
                },
              ]
            : [],
      }),
      updateFinancialHoldingForPrivateLimitedCompany: builder.mutation({
        query: ({ _id, ...financialHolding }) => ({
          url: `/vault/private-limited-companies/holdings/${_id}`,
          method: "PUT",
          body: financialHolding,
        }),
        invalidatesTags: (result, error, args) =>
          result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
      }),
    }),
  });

export const {
  useGetFinancialHoldingForPrivateLimitedCompanyQuery,
  useAddFinancialHoldingForPrivateLimitedCompanyMutation,
  useUpdateFinancialHoldingForPrivateLimitedCompanyMutation,
} = privateLimitedCompanyHoldingApiSlice;
