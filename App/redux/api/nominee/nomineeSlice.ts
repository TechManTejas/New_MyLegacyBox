import {
  EntityState,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../../constants/queryTags";
import { rootApiSlice } from "../rootApi";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";

interface NomineeType {
  _id: string;
}

const nomineeAdapter = createEntityAdapter<NomineeType>({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(b._id),
});

const initialState = nomineeAdapter.getInitialState();

export const extendedNomineeApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNominees: builder.query<EntityState<NomineeType>, void>({
      query: () => "/nominees",
      transformResponse: (responseData: { data: NomineeType[] }) => {
        return nomineeAdapter.setAll(initialState, responseData?.data || []);
      },
      providesTags: (result) =>
        result
          ? [
              { type: QUERY_TAGS.nominee, id: QUERY_TAGS.nomineeList },
              ...result.ids.map((id) => ({
                type: QUERY_TAGS.nominee as const,
                id,
              })),
            ]
          : [{ type: QUERY_TAGS.nominee, id: QUERY_TAGS.nomineeList }],
    }),
    addNominee: builder.mutation({
      query: (nominee) => ({
        url: "/nominees",
        method: "POST",
        body: nominee,
      }),
      invalidatesTags: (result) =>
        result
          ? [{ type: QUERY_TAGS.nominee, id: QUERY_TAGS.nomineeList }]
          : [],
    }),
    updateNominee: builder.mutation({
      query: ({ _id, ...nominee }) => ({
        url: `/nominees/${_id}`,
        method: "PUT",
        body: nominee,
      }),
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: QUERY_TAGS.nominee, id: arg._id }] : [],
    }),
  }),
  overrideExisting: true,
});

const selectNomineesResponse =
  extendedNomineeApiSlice.endpoints.getNominees.select();

const selectNominees = createSelector(
  selectNomineesResponse,
  (state) => state.data
);

export const { selectById: selectNomineeById } = nomineeAdapter.getSelectors<
  RootState<{}, string, "rootApi">
>((state) => selectNominees(state) ?? initialState);

export const {
  useGetNomineesQuery,
  useAddNomineeMutation,
  useUpdateNomineeMutation,
} = extendedNomineeApiSlice;
