import React from "react";
import { render } from "@testing-library/react-native";
import NewsIndex from "../NewsIndex";
import { useGetNewsQuery } from "../../../redux/api/news/newsApiSlice";
import { ActivityIndicator, Text } from "react-native";

// Mock the API slice
jest.mock("../../../redux/api/news/newsApiSlice", () => ({
  useGetNewsQuery: jest.fn(),
}));

describe("NewsIndex", () => {
  it("renders loading state", () => {
    (useGetNewsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    const { getByTestId, UNSAFE_getByType } = render(<NewsIndex />);
    // Finding ActivityIndicator
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it("renders error state", () => {
    (useGetNewsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    const { getByText } = render(<NewsIndex />);
    expect(getByText("Failed to load news.")).toBeTruthy();
  });

  it("renders list of news", () => {
    const mockData = {
      data: [
        { id: "1", title: "News 1", description: "Desc 1", date: "2024-01-01" },
        { id: "2", title: "News 2", description: "Desc 2", date: "2024-01-02" },
      ],
    };

    (useGetNewsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    const { getByText } = render(<NewsIndex />);

    expect(getByText("News 1")).toBeTruthy();
    expect(getByText("Desc 1")).toBeTruthy();
    expect(getByText("News 2")).toBeTruthy();
  });
});
