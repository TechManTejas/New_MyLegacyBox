import React from "react";
import { render } from "@testing-library/react-native";
import { CustomSkeleton } from "../CustomSkeleton";

describe("CustomSkeleton", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<CustomSkeleton width={100} height={20} />);
    expect(toJSON()).toBeTruthy();
  });
});
