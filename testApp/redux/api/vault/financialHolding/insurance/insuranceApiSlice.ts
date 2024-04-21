import { createEntityAdapter } from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";

interface InsuranceHoldingType {
  _id: string;
}

const insuranceHoldingsAdapter = createEntityAdapter<InsuranceHoldingType>({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(a._id),
});

const initialState = insuranceHoldingsAdapter.getInitialState();

export const insuranceHoldingApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialHoldingForInsurance: builder.query({
      query: (parentId) => `/vault/insurances/${parentId}/holdings`,
      transformResponse: (responseData: { data: InsuranceHoldingType[] }) => {
        return insuranceHoldingsAdapter.setAll(
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
                type: QUERY_TAGS.financialHolding as const,
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
        url: `/vault/insurances/${parentId}/holdings`,
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
        url: `/vault/insurances/${parentId}/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
    }),
  }),
});

export const {
  useGetFinancialHoldingForInsuranceQuery,
  useAddFinancialHoldingForInsuranceMutation,
  useUpdateFinancialHoldingForInsuranceMutation,
} = insuranceHoldingApiSlice;
