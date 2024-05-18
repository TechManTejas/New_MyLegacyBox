import { rootApiSlice } from "../rootApi";

export const extendedBookMeetSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    bookMeeting: builder.mutation({
      query: () => ({
        url: "/book-meeting",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useBookMeetingMutation,
} = extendedBookMeetSlice;
