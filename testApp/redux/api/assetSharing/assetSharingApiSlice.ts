import { createEntityAdapter } from "@reduxjs/toolkit";
import { QUERY_TAGS } from "../../../constants/queryTags";
import { rootApiSlice } from "../rootApi";

interface AssetShareType {
  _id: string;
}

const assetSharingAdapter = createEntityAdapter<any>({
  selectId: ({ _id }: any) => _id,
  sortComparer: (a: any, b: any) => a._id.localeCompare(b._id),
} as any);

const initialState = assetSharingAdapter.getInitialState();

export const assetSharingApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNomineesForAnArtifact: builder.query({
      query: (financialHoldingId: string) =>
        `/shared-artifact/nominator/${financialHoldingId}`,
      providesTags: [QUERY_TAGS.shareAsset],
    }),
    shareAssetToNominee: builder.mutation({
      query: (nominee: any) => ({
        url: "/shared-artifact/nominator",
        method: "POST",
        body: nominee,
      }),
      invalidatesTags: [QUERY_TAGS.shareAsset],
    }),
    revokeAssetAccessFromNominee: builder.mutation({
      query: (nominee: any) => ({
        url: "/shared-artifact/nominator",
        method: "DELETE",
        body: nominee,
      }),
      invalidatesTags: [QUERY_TAGS.shareAsset],
    }),
    getAllAssetSharedToANominee: builder.query({
      query: (nomineeEmail: string) =>
        `/shared-artifact/nominator?nomineeEmail=${nomineeEmail}`,
      transformResponse: (responseData: { data: AssetShareType[] }) => {
        return assetSharingAdapter.setAll(
          initialState,
          responseData?.data || [],
        );
      },
      providesTags: [QUERY_TAGS.shareAsset],
    }),
    getAllNominators: builder.query({
      query: () => "/shared-artifact/nominee/shared-nominators",
      transformResponse: (responseData: { data: AssetShareType[] }) => {
        return assetSharingAdapter.setAll(
          initialState,
          responseData?.data || [],
        );
      },
      providesTags: [QUERY_TAGS.shareAsset],
    }),
    getSharedArtifactByNominatorWithUidAndType: builder.query({
      query: (data: any) =>
        `/shared-artifact/nominee?nominatorHashedUid=${data.nominatorHashedUid}&financialArtifactType=${data.financialArtifactType}`,
      providesTags: [QUERY_TAGS.shareAsset],
      transformResponse: (responseData: { data: AssetShareType[] }) => {
        return assetSharingAdapter.setAll(
          initialState,
          responseData?.data || [],
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
