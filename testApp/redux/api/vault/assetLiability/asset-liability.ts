import { QUERY_TAGS } from "../../../../constants/queryTags";
import { rootApiSlice } from "../../rootApi";

export const extendedAssetLiabilities = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssetsLiabilities: builder.query({
      query: () => "/vault/assets-liabilities",
      providesTags: [QUERY_TAGS.assetsLiabilities],
    }),
  }),
  overrideExisting: true,
});

export const { useGetAssetsLiabilitiesQuery } = extendedAssetLiabilities;
