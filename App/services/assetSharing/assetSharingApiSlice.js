import { createEntityAdapter } from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../constants/queryTags";
import { sharedArtifactApiSlice } from "../api/sharedArtifactApiSlice";

const assetSharingAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a._id.localeCompare(b._id),
});

const initialState = assetSharingAdapter.getInitialState();

export const assetSharingApiSlice = sharedArtifactApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNomineesForAnArtifact: builder.query({
      query: (financialHoldingId) => `/nominator/${financialHoldingId}`,
      providesTags: [QUERY_TAGS.shareAsset],
    }),
    shareAssetToNominee: builder.mutation({
      query: (nominee) => ({
        url: "/nominator",
        method: "POST",
        body: nominee,
      }),
      invalidatesTags: [QUERY_TAGS.shareAsset],
    }),
    revokeAssetAccessFromNominee: builder.mutation({
      query: (nominee) => ({
        url: "/nominator",
        method: "DELETE",
        body: nominee,
      }),
      invalidatesTags: [QUERY_TAGS.shareAsset],
    }),
    getAllAssetSharedToANominee: builder.query({
      query: (nomineeEmail) => `/nominator?nomineeEmail=${nomineeEmail}`,
      transformResponse: (responseData) => {
        return assetSharingAdapter.setAll(
          initialState,
          responseData?.data || []
        );
      },
      providesTags: [QUERY_TAGS.shareAsset],
    }),
    getAllNominators: builder.query({
      query: () => "/nominee/shared-nominators",
      transformResponse: (responseData) => {
        return assetSharingAdapter.setAll(
          initialState,
          responseData?.data || []
        );
      },
      providesTags: [QUERY_TAGS.shareAsset],
    }),
    getSharedArtifactByNominatorWithUidAndType: builder.query({
      query: (data) =>
        `/nominee?nominatorHashedUid=${data.nominatorHashedUid}&financialArtifactType=${data.financialArtifactType}`,
      providesTags: [QUERY_TAGS.shareAsset],
      transformResponse: (responseData) => {
        return assetSharingAdapter.setAll(
          initialState,
          responseData?.data || []
        );
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetNomineesForAnArtifactQuery,
  useShareAssetToNomineeMutation,
  useRevokeAssetAccessFromNomineeMutation,
  useGetAllAssetSharedToANomineeQuery,
  useGetAllNominatorsQuery,
  useGetSharedArtifactByNominatorWithUidAndTypeQuery,
} = assetSharingApiSlice;
