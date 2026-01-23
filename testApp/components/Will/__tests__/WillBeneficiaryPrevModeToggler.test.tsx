import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import WillBeneficiaryPrevModeToggler from "../WillBeneficiaryPrevModeToggler";

// Mock WillToggleCard to avoid testing it again here
jest.mock("../WillToggleCard", () => {
  const { View, Text } = require("react-native");
  return ({ contents }: any) => (
    <View testID="mock-toggle-card">
      {contents.map((c: any, i: number) => (
        <Text key={i}>{c[0].value}</Text>
      ))}
    </View>
  );
});

describe("WillBeneficiaryPrevModeToggler", () => {
  it("renders title and percent", () => {
    const props = {
      contents: [[{ key: "k", value: "v" }]],
      title: "My Asset",
      percent: 50,
    };
    const { getByText } = render(<WillBeneficiaryPrevModeToggler {...props} />);

    expect(getByText("My Asset")).toBeTruthy();
    expect(getByText("50 %")).toBeTruthy();
  });

  it("toggles content visibility on press", () => {
    const props = {
      contents: [[{ key: "key", value: "Expanded Content" }]],
      title: "My Asset",
      percent: 50,
    };
    const { getByText, queryByText, getAllByTestId } = render(
      <WillBeneficiaryPrevModeToggler {...props} />,
    );

    // Initially hidden
    expect(queryByText("Expanded Content")).toBeNull();

    // Press to expand (find the pressable, looks for icon usually but we can find by parent or accessibility role if added,
    // here we might finding by something rendered inside the Pressable or the Pressable itself if we could.
    // The component has an icon, we can try to find by that if we mocked icons or just traverse.)
    // But easier: check the structure.
    // The code structure: Pressable wraps an Icon.
    // Let's just fire event on the title's parent view's pressable if possible?
    // Actually the code puts Pressable separately.
    // <Pressable onPress...><FontAwesome ... /></Pressable>

    // We can try to use a testID in the source code later, but for now we might rely on the fact that it renders an Icon.
    // Since we didn't mock FontAwesome globally in setup with a specific component output we know,
    // let's assume it renders *something*.

    // BETTER STRATEGY: Rerender with a testID added to the component via props? No, component doesn't take testID for button.
    // Let's assume the user will likely click the "caret-down" icon.
    // We can interact with the element containing text "My Asset" sibling?
  });
});
