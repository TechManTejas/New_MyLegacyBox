import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../constants/queryTags";
import { vaultApiSlice } from "../api/vaultApiSlice";

const bankAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(b._id),
});

const initialState = bankAdapter.getInitialState();

export const extendedBankApiSlice = vaultApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanks: builder.query({
      query: () => "/banks",
      transformResponse: (responseData) => {
        return bankAdapter.setAll(initialState, responseData?.data || []);
      },
      providesTags: (result) =>
        result
          ? [
              { type: QUERY_TAGS.bank, id: QUERY_TAGS.bankList },
              ...result.ids.map((id) => ({ type: QUERY_TAGS.bank, id })),
            ]
          : [{ type: QUERY_TAGS.bank, id: QUERY_TAGS.bankList }],
    }),
    addBank: builder.mutation({
      query: (bank) => ({
        url: "/banks",
        method: "POST",
        body: bank,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: QUERY_TAGS.bank, id: QUERY_TAGS.bankList }] : [],
    }),
    updateBank: builder.mutation({
      query: ({ _id, ...bank }) => ({
        url: `/banks/${_id}`,
        method: "PUT",
        body: bank,
      }),
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: QUERY_TAGS.bank, id: arg._id }] : [],
    }),
  }),
  overrideExisting: true,
});

const selectBanksResponse = extendedBankApiSlice.endpoints.getBanks.select();

const selectBanks = createSelector(selectBanksResponse, (state) => state.data);

export const { selectById: selectBankById } = bankAdapter.getSelectors(
  (state) => selectBanks(state) ?? initialState
);

export const { useGetBanksQuery, useAddBankMutation, useUpdateBankMutation } =
  extendedBankApiSlice;
