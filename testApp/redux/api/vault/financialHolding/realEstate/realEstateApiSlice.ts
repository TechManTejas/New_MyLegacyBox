import { createEntityAdapter } from "@reduxjs/toolkit";
import { URLSearchParams } from "react-native-url-polyfill";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";

interface realEstateHoldingType {
  _id: string;
}

const realEstateHoldingsAdapter = createEntityAdapter<realEstateHoldingType>({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(a._id),
});

const initialState = realEstateHoldingsAdapter.getInitialState();

export const realEstateHoldingApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialHoldingForRealEstate: builder.query({
      query: (filter) =>
        `/vault/real-estates/holdings?${new URLSearchParams(filter)}`,
      transformResponse: (responseData: { data: realEstateHoldingType[] }) => {
        return realEstateHoldingsAdapter.setAll(
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
                type: QUERY_TAGS.financialHolding as const,
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
        url: `/vault/real-estates/holdings`,
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
        url: `/vault/real-estates/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
    }),
  }),
});

export const {
  useGetFinancialHoldingForRealEstateQuery,
  useAddFinancialHoldingForRealEstateMutation,
  useUpdateFinancialHoldingForRealEstateMutation,
} = realEstateHoldingApiSlice;
