import {
  EntityState,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";

interface InsuranceType {
  _id: string;
}

const insuranceAdapter = createEntityAdapter<any>({
  selectId: ({ _id }: any) => _id,
  sortComparer: (a: any, b: any) => a._id.localeCompare(b._id),
} as any);

const initialState = insuranceAdapter.getInitialState();

export const extendedInsuranceApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInsurances: builder.query<EntityState<any, string>, void>({
      query: () => "/vault/insurances",
      transformResponse: (responseData: { data: InsuranceType[] }) => {
        return insuranceAdapter.setAll(initialState, responseData?.data || []);
      },
      providesTags: (result) =>
        result
          ? [
              { type: QUERY_TAGS.insurance, id: QUERY_TAGS.insuranceList },
              ...result.ids.map((id: any) => ({
                type: QUERY_TAGS.insurance as const,
                id,
              })),
            ]
          : [{ type: QUERY_TAGS.insurance, id: QUERY_TAGS.insuranceList }],
    }),
    addInsurance: builder.mutation({
      query: (insurance: any) => ({
        url: "/vault/insurances",
        method: "POST",
        body: insurance,
      }),
      invalidatesTags: (result) =>
        result
          ? [{ type: QUERY_TAGS.insurance, id: QUERY_TAGS.insuranceList }]
          : [],
    }),
    updateInsurance: builder.mutation({
      query: ({ _id, ...insurance }: any) => ({
        url: `/vault/insurances/${_id}`,
        method: "PUT",
        body: insurance,
      }),
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: QUERY_TAGS.insurance, id: arg._id }] : [],
    }),
  }),
  overrideExisting: true,
});

const selectInsurancesResponse =
  extendedInsuranceApiSlice.endpoints.getInsurances.select();

const selectInsurances = createSelector(
  selectInsurancesResponse,
  (state) => state.data,
);

export const { selectById: selectInsuranceById } =
  insuranceAdapter.getSelectors<RootState<{}, string, "rootApi">>(
    (state) => selectInsurances(state) ?? initialState,
  );

export const {
  useGetInsurancesQuery,
  useAddInsuranceMutation,
  useUpdateInsuranceMutation,
} = extendedInsuranceApiSlice;
