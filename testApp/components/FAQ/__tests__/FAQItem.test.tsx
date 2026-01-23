import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FAQItem from "../FAQItem";

describe("FAQItem", () => {
  it("renders question correctly", () => {
    const { getByText } = render(
      <FAQItem question="What is it?" answer="It is a test." />,
    );
    expect(getByText("What is it?")).toBeTruthy();
  });

  it("toggles answer visibility", () => {
    const { getByText, queryByText } = render(
      <FAQItem question="What is it?" answer="It is a test." />,
    );

    // Initially answer should not be visible
    expect(queryByText("It is a test.")).toBeNull();

    // Expand
    fireEvent.press(getByText("What is it?"));
    expect(getByText("It is a test.")).toBeTruthy();

    // Collapse
    fireEvent.press(getByText("What is it?"));
    expect(queryByText("It is a test.")).toBeNull();
  });
});
