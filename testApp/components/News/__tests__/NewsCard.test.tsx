import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NewsCard from "../NewsCard";

describe("NewsCard", () => {
  it("renders correctly", () => {
    const props = {
      title: "News Title",
      description: "News Description",
      date: "2024-01-01",
      onPress: jest.fn(),
    };

    const { getByText } = render(<NewsCard {...props} />);

    expect(getByText("News Title")).toBeTruthy();
    expect(getByText("News Description")).toBeTruthy();
    expect(getByText("2024-01-01")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const mockOnPress = jest.fn();
    const props = {
      title: "News Title",
      description: "News Description",
      date: "2024-01-01",
      onPress: mockOnPress,
    };

    const { getByText } = render(<NewsCard {...props} />);

    // NewsCard wraps content in Pressable
    fireEvent.press(getByText("News Title"));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
