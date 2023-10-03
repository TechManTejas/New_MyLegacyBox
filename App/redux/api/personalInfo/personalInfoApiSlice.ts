import { QUERY_TAGS } from "../../../constants/queryTags";
import { rootApiSlice } from "../rootApi";

export const personalInfoApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalInfo: builder.query({
      query: () => "/personal-info",
      providesTags: [QUERY_TAGS.personalInfo],
    }),
    savePersonalInfo: builder.mutation({
      query: (info) => ({
        url: "/personal-info",
        method: "PUT",
        body: info,
      }),
      invalidatesTags: (_, err) => (err ? [] : [QUERY_TAGS.personalInfo]),
    }),
  }),
  overrideExisting: true,
});

export const { useGetPersonalInfoQuery, useSavePersonalInfoMutation } =
  personalInfoApiSlice;
