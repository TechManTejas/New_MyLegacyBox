import { createEntityAdapter } from "@reduxjs/toolkit";
import { QUERY_TAGS, tagTypes } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";

interface FinancialHoldingType {
  _id: string;
}

const financialHoldingsAdapter = createEntityAdapter<FinancialHoldingType>({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(a._id),
});

const initialState = financialHoldingsAdapter.getInitialState();

export const extendedFinancialHoldingApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFinancialHoldings: builder.query({
      query: () => "/vault/financial-holdings",
      transformResponse: (responseData: { data: FinancialHoldingType[] }) => {
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
                id: QUERY_TAGS.allFinancialHoldingList,
              },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.financialHolding as const,
                id,
              })),
            ]
          : [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.allFinancialHoldingList,
              },
            ],
    }),
    deleteFinancialHoldingById: builder.mutation({
      query: (financialHoldingId) => ({
        url: `/vault/financial-holdings/${financialHoldingId}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        QUERY_TAGS.financialHolding, QUERY_TAGS.archivedAssets
      ],
    }),
    getArchivedFinancialHoldings: builder.query({
      query: () => "/vault/archive-financial-holdings",
      transformResponse: (responseData) => {
        return financialHoldingsAdapter.setAll(
          initialState,
          responseData?.data || []
        );
      },
      providesTags: [ QUERY_TAGS.archivedAssets ]
    })
  }),
  overrideExisting: true,
});

export const {
  useGetAllFinancialHoldingsQuery,
  useDeleteFinancialHoldingByIdMutation,
  useGetArchivedFinancialHoldingsQuery
} = extendedFinancialHoldingApiSlice;
