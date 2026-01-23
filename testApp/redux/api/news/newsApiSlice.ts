import { rootApiSlice } from "../rootApi";

export const extendedNewsApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => "/news",
    }),
  }),
  overrideExisting: true,
});

export const { useGetNewsQuery } = extendedNewsApiSlice;
