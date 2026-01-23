import React from "react";
import { render } from "@testing-library/react-native";
import { CustomAvatar } from "../CustomAvatar";

describe("CustomAvatar", () => {
  it("renders initials correctly", () => {
    const { getByText } = render(<CustomAvatar initials="JD" />);
    expect(getByText("JD")).toBeTruthy();
  });
});
