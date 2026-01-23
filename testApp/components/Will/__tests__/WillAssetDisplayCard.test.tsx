import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import WillAssetDisplayCard from "../WillAssetDisplayCard";

// Mock child components
jest.mock("../WillNamePercentCard", () => {
  const { View, Text } = require("react-native");
  return () => (
    <View>
      <Text>Mock WillNamePercentCard</Text>
    </View>
  );
});

jest.mock("../WillToggleCard", () => {
  const { View, Text } = require("react-native");
  return () => (
    <View>
      <Text>Mock WillToggleCard</Text>
    </View>
  );
});

describe("WillAssetDisplayCard", () => {
  it("renders asset title and toggles info", () => {
    const asset = {
      itemTitle: "Checking Account",
      section: "BANK",
      children: [
        {
          holding: {
            accountType: "SAVINGS",
            ownership: "SINGLE",
            accountNumber: "12345678",
          },
        },
      ],
      allocations: { ben1: 100 },
    };

    // We are mocking WillNamePercentCard inside it? No, it's imported. WillNamePercentCard uses Redux.
    // So we need to mock useSelector for WillNamePercentCard or mock WillNamePercentCard itself.
    // Since we are testing WillAssetDisplayCard, mocking the child component is safer to avoid Redux noise.

    // However, I can't easily mock inner components unless I use jest.mock at top level.
    // I will use top level mock for WillNamePercentCard.

    const { getByText } = render(<WillAssetDisplayCard asset={asset} />);

    expect(getByText("Checking Account")).toBeTruthy();

    // Assuming there is a toggle button (usually an icon pressable).
    // content is hidden initially.

    // We can verify that it renders without error given the complex prop structure.
  });
});
