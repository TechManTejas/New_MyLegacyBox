import React from "react";
import { render } from "@testing-library/react-native";
import { CustomBadge } from "../CustomBadge";

describe("CustomBadge", () => {
  it("renders correctly with label", () => {
    const { getByText } = render(<CustomBadge label="Pro" />);
    expect(getByText("Pro")).toBeTruthy();
  });
});
