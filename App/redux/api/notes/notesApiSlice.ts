import { QUERY_TAGS } from "../../../constants/queryTags";
import { rootApiSlice } from "../rootApi";

export const notesApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotesByArtifactId: builder.query({
      query: (artifactId) => `/notes/${artifactId}`,
      providesTags: [QUERY_TAGS.notes],
    }),
    updateNotesByArtifactId: builder.mutation({
      query: ({ artifactId, note }: { artifactId: string; note: string }) => ({
        url: `/notes/${artifactId}`,
        method: "PUT",
        body: { note },
      }),
      invalidatesTags: [QUERY_TAGS.notes],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetNotesByArtifactIdQuery,
  useUpdateNotesByArtifactIdMutation,
} = notesApiSlice;
