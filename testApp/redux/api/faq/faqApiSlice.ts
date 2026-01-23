import { rootApiSlice } from "../rootApi";

export const extendedFAQApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFAQs: builder.query({
      query: () => "/faqs",
    }),
  }),
  overrideExisting: true,
});

export const { useGetFAQsQuery } = extendedFAQApiSlice;
