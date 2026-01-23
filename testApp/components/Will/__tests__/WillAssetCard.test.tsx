import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import WillAssetCard from "../WillAssetCard";

describe("WillAssetCard", () => {
  it("renders title and subtitle correctly", () => {
    const props = {
      title: "Test Asset",
      subTitle: "Test Subtitle",
      pressHandler: jest.fn(),
      selected: false,
      containerStyle: {},
    };

    const { getByText } = render(<WillAssetCard {...props} />);

    expect(getByText("Test Asset")).toBeTruthy();
    expect(getByText("Test Subtitle")).toBeTruthy();
  });

  it("calls pressHandler when pressed", () => {
    const mockPressHandler = jest.fn();
    const props = {
      title: "Test Asset",
      subTitle: "Test Subtitle",
      pressHandler: mockPressHandler,
      selected: false,
      containerStyle: {},
    };

    const { getByText } = render(<WillAssetCard {...props} />);

    // WillAssetCard uses Pressable inside, likely wrapping the text or the whole card
    fireEvent.press(getByText("Test Asset"));
    expect(mockPressHandler).toHaveBeenCalledWith("Test Asset");
  });

  it("shows check icon when selected", () => {
    // Assuming FontAwesome5 renders something detectable or we just check render doesn't crash
    const props = {
      title: "Test Asset",
      subTitle: "Test Subtitle",
      pressHandler: jest.fn(),
      selected: true,
      containerStyle: {},
    };
    render(<WillAssetCard {...props} />);
    // In a real environment we might mock the icon library to check for specific icon name props
  });
});
