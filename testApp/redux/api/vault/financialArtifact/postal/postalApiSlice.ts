import {
  EntityState,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../../../../constants/queryTags";
import { rootApiSlice } from "../../../rootApi";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";

interface PostalType {
  _id: string;
}

const postalAdapter = createEntityAdapter<any>({
  selectId: ({ _id }: any) => _id,
  sortComparer: (a: any, b: any) => a._id.localeCompare(b._id),
} as any);

const initialState = postalAdapter.getInitialState();

export const extendedPostalApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostals: builder.query<EntityState<any, string>, void>({
      query: () => "/vault/postals",
      transformResponse: (responseData: { data: PostalType[] }) => {
        return postalAdapter.setAll(initialState, responseData?.data || []);
      },
      providesTags: (result) =>
        result
          ? [
              { type: QUERY_TAGS.postal, id: QUERY_TAGS.postalList },
              ...result.ids.map((id: any) => ({
                type: QUERY_TAGS.postal as const,
                id,
              })),
            ]
          : [{ type: QUERY_TAGS.postal, id: QUERY_TAGS.postalList }],
    }),
    addPostal: builder.mutation({
      query: (postal: any) => ({
        url: "/vault/postals",
        method: "POST",
        body: postal,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: QUERY_TAGS.postal, id: QUERY_TAGS.postalList }] : [],
    }),
    updatePostal: builder.mutation({
      query: ({ _id, ...postal }: any) => ({
        url: `/vault/postals/${_id}`,
        method: "PUT",
        body: postal,
      }),
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: QUERY_TAGS.postal, id: arg._id }] : [],
    }),
  }),
  overrideExisting: true,
});

const selectPostalsResponse =
  extendedPostalApiSlice.endpoints.getPostals.select();

const selectPostals = createSelector(
  selectPostalsResponse,
  (state) => state.data,
);

export const { selectById: selectPostalById } = postalAdapter.getSelectors<
  RootState<{}, string, "rootApi">
>((state) => selectPostals(state) ?? initialState);

export const {
  useGetPostalsQuery,
  useAddPostalMutation,
  useUpdatePostalMutation,
} = extendedPostalApiSlice;
