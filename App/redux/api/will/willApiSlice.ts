import { QUERY_TAGS } from "../../../constants/queryTags";
import { rootApiSlice } from "../rootApi";

export const extendedWillApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWill: builder.query({
      query: () => "/wills/will",
      providesTags: [QUERY_TAGS.will],
    }),
    addOrUpdateWill: builder.mutation({
      query: (will) => ({
        url: "/wills",
        method: "PUT",
        body: will,
      }),
      invalidatesTags: [QUERY_TAGS.will],
    }),
    generateWordFileHash: builder.mutation({
      query: () => ({
        url: "/wills/file-hashed-will-id",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetWillQuery,
  useAddOrUpdateWillMutation,
  useGenerateWordFileHashMutation,
} = extendedWillApiSlice;

export const generateWordFileWillByHashUrl = `${process.env.EXPO_PUBLIC_BASE_API_URL}/wills/word-file/:hashedWillId`;
