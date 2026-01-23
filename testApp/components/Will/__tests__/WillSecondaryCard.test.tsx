import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import WillSecondaryCard from "../WillSecondaryCard";

describe("WillSecondaryCard", () => {
  it("renders correctly with given props", () => {
    const distData = [{ percent: 50 }, { percent: 50 }]; // Simplistic mock for distCheck

    const { getByText } = render(
      <WillSecondaryCard
        beneficiaryName="Test Beneficiary"
        distType={2}
        changeToType1={jest.fn()}
        changeToType2={jest.fn()}
        distributionCard={<Text>Mock Distribution Card</Text>}
        isError={false}
        distData={distData}
      />,
    );

    expect(getByText("Test Beneficiary")).toBeTruthy();
    expect(getByText("Distribute among other beneficiaries")).toBeTruthy();
    expect(getByText("Mock Distribution Card")).toBeTruthy();
  });
});
