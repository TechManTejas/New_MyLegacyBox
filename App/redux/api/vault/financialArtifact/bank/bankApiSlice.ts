import {
  EntityState,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";
import { rootApiSlice } from "../../../rootApi";

type Bank = {
  _id: string;
  // Other properties...
};

const bankAdapter = createEntityAdapter<Bank>({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(b._id),
});

const initialState = bankAdapter.getInitialState();

export const extendedBankApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanks: builder.query<EntityState<Bank>, void>({
      query: () => "/vault/banks",
      transformResponse: (responseData: { data: Bank[] }) => {
        const banksData = responseData.data || [];
        return bankAdapter.setAll(initialState, banksData);
      },
      providesTags: (result) =>
        result
          ? [
              { type: QUERY_TAGS.bank, id: QUERY_TAGS.bankList },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.bank as const,
                id,
              })),
            ]
          : [{ type: QUERY_TAGS.bank, id: QUERY_TAGS.bankList }],
    }),
    addBank: builder.mutation({
      query: (bank) => ({
        url: "/vault/banks",
        method: "POST",
        body: bank,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: QUERY_TAGS.bank, id: QUERY_TAGS.bankList }] : [],
    }),
    updateBank: builder.mutation({
      query: ({ _id, ...bank }) => ({
        url: `/vault/banks/${_id}`,
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

export const { selectById: selectBankById } = bankAdapter.getSelectors<
  RootState<{}, string, "rootApi">
>((state) => selectBanks(state) ?? initialState);

export const { useGetBanksQuery, useAddBankMutation, useUpdateBankMutation } =
  extendedBankApiSlice;
