import { QUERY_TAGS } from "../../constants/queryTags";
import { notesApiSlice } from "../api/notesApiSlice";

export const notesSlice = notesApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotesByArtifactId: builder.query({
      query: (artifactId) => `/${artifactId}`,
      providesTags: [QUERY_TAGS.notes],
    }),
    updateNotesByArtifactId: builder.mutation({
      query: ({ artifactId, note }) => ({
        url: `/${artifactId}`,
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
} = notesSlice;
