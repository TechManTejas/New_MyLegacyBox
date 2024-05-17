import { QUERY_TAGS } from "../../../constants/queryTags";
import { rootApiSlice } from "../rootApi";

export const feedbackApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFeedback: builder.mutation({
      query: (feedback) => ({
        url: "/feedbacks",
        method: "POST",
        body: feedback,
      }),
      invalidatesTags: [QUERY_TAGS.feedback],
    }),
  }),
});

export const { useAddFeedbackMutation } = feedbackApiSlice;
