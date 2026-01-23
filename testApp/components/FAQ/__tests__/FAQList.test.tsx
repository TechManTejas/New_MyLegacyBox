import React from "react";
import { render } from "@testing-library/react-native";
import FAQList from "../FAQList";

describe("FAQList", () => {
  it("renders multiple keys correctly", () => {
    const data = [
      { id: "1", question: "Q1", answer: "A1" },
      { id: "2", question: "Q2", answer: "A2" },
    ];

    const { getByText } = render(<FAQList data={data} />);

    expect(getByText("Q1")).toBeTruthy();
    expect(getByText("Q2")).toBeTruthy();
  });
});
