import { QUERY_TAGS } from "../../constants/queryTags";
import { personalInfoApiSlice } from "../api/personalInfoApiSlice";

export const peronalInfoSlice = personalInfoApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalInfo: builder.query({
      query: () => "/",
      providesTags: [QUERY_TAGS.personalInfo],
    }),
    savePersonalInfo: builder.mutation({
      query: (info) => ({
        url: "/",
        method: "PUT",
        body: info,
      }),
      invalidatesTags: (res, err) => (err ? [] : [QUERY_TAGS.personalInfo]),
    }),
  }),
  overrideExisting: true,
});

export const { useGetPersonalInfoQuery, useSavePersonalInfoMutation } =
  peronalInfoSlice;
