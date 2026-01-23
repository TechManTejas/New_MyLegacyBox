import React from "react";
import { render } from "@testing-library/react-native";
import CustomHeaderTitle from "../CustomHeaderTitle";

// We don't need to mock useTheme if it uses a default context, but it's safer to provide it ideally.
// However, CustomHeaderTitle uses useTheme.
// In jest.setup.js or AuthProvider mock we didn't mock ThemeProvider completely.
// But ThemeProvider.tsx has a default value.
// Let's rely on that for now.

describe("CustomHeaderTitle", () => {
  it("renders the title correctly", () => {
    const { getByText } = render(
      <CustomHeaderTitle>My Title</CustomHeaderTitle>,
    );
    expect(getByText("My Title")).toBeTruthy();
  });

  it("truncates long titles", () => {
    const longTitle =
      "This is a very very long title that should be truncated because it exceeds limits";
    const { getByText, queryByText } = render(
      <CustomHeaderTitle>{longTitle}</CustomHeaderTitle>,
    );

    // It slices at 28 chars
    const expected = longTitle.slice(0, 28) + "...";

    expect(getByText(expected)).toBeTruthy();
    expect(queryByText(longTitle)).toBeNull();
  });
});
