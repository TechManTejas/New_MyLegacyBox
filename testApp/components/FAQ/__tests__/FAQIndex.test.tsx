import React from "react";
import { render } from "@testing-library/react-native";
import FAQIndex from "../FAQIndex";
import { useGetFAQsQuery } from "../../../redux/api/faq/faqApiSlice";
import { ActivityIndicator } from "react-native";

// Mock the API slice
jest.mock("../../../redux/api/faq/faqApiSlice", () => ({
  useGetFAQsQuery: jest.fn(),
}));

describe("FAQIndex", () => {
  it("renders loading state", () => {
    (useGetFAQsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    const { UNSAFE_getByType } = render(<FAQIndex />);
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it("renders error state", () => {
    (useGetFAQsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    const { getByText } = render(<FAQIndex />);
    expect(getByText("Failed to load FAQs.")).toBeTruthy();
  });

  it("renders data correctly", () => {
    const mockData = {
      data: [{ id: "1", question: "Q1", answer: "A1" }],
    };
    (useGetFAQsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    const { getByText } = render(<FAQIndex />);
    expect(getByText("Q1")).toBeTruthy();
  });
});
