import { createEntityAdapter } from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";

interface BankHoldingType {
  _id: string;
}

const bankHoldingsAdapter = createEntityAdapter<any>({
  selectId: ({ _id }: any) => _id,
  sortComparer: (a: any, b: any) => a._id.localeCompare(a._id),
} as any);

const initialState = bankHoldingsAdapter.getInitialState();

export const bankHoldingApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialHoldingForBank: builder.query({
      query: (parentId: string) => `/vault/banks/${parentId}/holdings`,
      transformResponse: (responseData: { data: BankHoldingType[] }) => {
        return bankHoldingsAdapter.setAll(
          initialState,
          responseData?.data || [],
        );
      },
      providesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingBankList,
              },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.financialHolding as const,
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
      query: ({ parentId, ...holding }: any) => ({
        url: `/vault/banks/${parentId}/holdings`,
        method: "POST",
        body: holding,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              {
                type: QUERY_TAGS.financialHolding,
                id: QUERY_TAGS.financialHoldingBankList as const,
              },
            ]
          : [],
    }),
    updateFinancialHoldingForBank: builder.mutation({
      query: ({ parentId, _id, ...financialHolding }: any) => ({
        url: `/vault/banks/${parentId}/holdings/${_id}`,
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
} = bankHoldingApiSlice;
