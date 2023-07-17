import { QUERY_TAGS } from "../../constants/queryTags";
import { sharedArtifactApiSlice } from "../api/sharedArtifactApiSlice";

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
      providesTags: [QUERY_TAGS.shareAsset],
    }),
    getAllNominators: builder.query({
      query: () => "/nominee/shared-nominators",
      providesTags: [QUERY_TAGS.shareAsset],
    }),
    getSharedArtifactByNominatorWithUidAndType: builder.query({
      query: (data) =>
        `/nominee?nominatorHashedUid=${data.nominatorHashedUid}&financialArtifactType=${data.financialArtifactType}`,
      providesTags: [QUERY_TAGS.shareAsset],
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
