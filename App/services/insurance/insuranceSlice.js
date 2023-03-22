import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../constants/queryTags";
import { vaultApiSlice } from "../api/vaultApiSlice";

const insuranceAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(b._id),
});

const initialState = insuranceAdapter.getInitialState();

export const extendedInsuranceApiSlice = vaultApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInsurances: builder.query({
      query: () => "/insurances",
      transformResponse: (responseData) => {
        return insuranceAdapter.setAll(initialState, responseData?.data || []);
      },
      providesTags: (result) =>
        result
          ? [
              { type: QUERY_TAGS.insurance, id: QUERY_TAGS.insuranceList },
              ...result.ids.map((id) => ({ type: QUERY_TAGS.insurance, id })),
            ]
          : [{ type: QUERY_TAGS.insurance, id: QUERY_TAGS.insuranceList }],
    }),
    addInsurance: builder.mutation({
      query: (insurance) => ({
        url: "/insurances",
        method: "POST",
        body: insurance,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: QUERY_TAGS.insurance, id: QUERY_TAGS.insuranceList }] : [],
    }),
    updateInsurance: builder.mutation({
      query: ({ _id, ...insurance }) => ({
        url: `/insurances/${_id}`,
        method: "PUT",
        body: insurance,
      }),
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: QUERY_TAGS.insurance, id: arg._id }] : [],
    }),
  }),
  overrideExisting: true,
});

const selectInsurancesResponse = extendedInsuranceApiSlice.endpoints.getInsurances.select();

const selectInsurances = createSelector(selectInsurancesResponse, (state) => state.data);

export const { selectById: selectInsuranceById } = insuranceAdapter.getSelectors(
  (state) => selectInsurances(state) ?? initialState
);

export const { useGetInsurancesQuery, useAddInsuranceMutation, useUpdateInsuranceMutation } =
  extendedInsuranceApiSlice;
