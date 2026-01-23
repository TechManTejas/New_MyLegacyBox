import React from "react";
import { render } from "@testing-library/react-native";
import WillToggleCard from "../WillToggleCard";

describe("WillToggleCard", () => {
  it("renders list of contents correctly", () => {
    const contents = [
      { key: "Label 1", value: "Value 1" },
      { key: "Label 2", value: "Value 2" },
    ];

    const { getByText } = render(<WillToggleCard contents={contents} />);

    expect(getByText("Label 1")).toBeTruthy();
    expect(getByText("Value 1")).toBeTruthy();
    expect(getByText("Label 2")).toBeTruthy();
    expect(getByText("Value 2")).toBeTruthy();
  });

  it("renders fallback text for missing values", () => {
    const contents = [{ key: null, value: null }];

    const { getAllByText } = render(<WillToggleCard contents={contents} />);
    expect(getAllByText("Not available").length).toBeGreaterThan(0);
  });

  it("renders divider correctly", () => {
    const contents = [{ type: "divider" }];
    render(<WillToggleCard contents={contents} />);
    // Just ensure it renders without error
  });
});
