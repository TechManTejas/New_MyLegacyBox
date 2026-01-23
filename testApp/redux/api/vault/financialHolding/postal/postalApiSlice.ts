import { createEntityAdapter } from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";

interface PostalHoldingType {
  _id: string;
}

const postalHoldingsAdapter = createEntityAdapter<any>({
  selectId: (model: PostalHoldingType) => model._id,
  sortComparer: (a: PostalHoldingType, b: PostalHoldingType) =>
    a._id.localeCompare(a._id),
} as any);

const initialState = postalHoldingsAdapter.getInitialState();

export const postalHoldingApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialHoldingForPostal: builder.query({
      query: (parentId: any) => `/vault/postals/${parentId}/holdings`,
      transformResponse: (responseData: { data: PostalHoldingType[] }) => {
        return postalHoldingsAdapter.setAll(
          initialState,
          responseData?.data || [],
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
                type: QUERY_TAGS.financialHolding as const,
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
      query: ({ parentId, ...holding }: any) => ({
        url: `/vault/postals/${parentId}/holdings`,
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
      query: ({ parentId, _id, ...financialHolding }: any) => ({
        url: `/vault/postals/${parentId}/holdings/${_id}`,
        method: "PUT",
        body: financialHolding,
      }),
      invalidatesTags: (result, error, args) =>
        result ? [{ type: QUERY_TAGS.financialHolding, _id: args._id }] : [],
    }),
  }),
});

export const {
  useGetFinancialHoldingForPostalQuery,
  useAddFinancialHoldingForPostalMutation,
  useUpdateFinancialHoldingForPostalMutation,
} = postalHoldingApiSlice;
