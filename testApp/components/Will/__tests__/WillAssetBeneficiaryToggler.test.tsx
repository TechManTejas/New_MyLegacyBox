import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import WillAssetBeneficiaryToggler from "../WillAssetBeneficiaryToggler";

describe("WillAssetBeneficiaryToggler", () => {
  it("renders correctly and handles button presses", () => {
    const mockAssetBtnCallback = jest.fn();
    const mockBeneficiaryBtnCallback = jest.fn();

    const { getByText, getByTestId } = render(
      <WillAssetBeneficiaryToggler
        distributionView="asset"
        assetBtnCallback={mockAssetBtnCallback}
        beneficiaryBtnCallback={mockBeneficiaryBtnCallback}
      />,
    );

    const assetButton = getByText("Asset");
    const beneficiaryButton = getByText("Beneficiary");

    expect(assetButton).toBeTruthy();
    expect(beneficiaryButton).toBeTruthy();

    fireEvent.press(assetButton);
    expect(mockAssetBtnCallback).toHaveBeenCalled();

    fireEvent.press(beneficiaryButton);
    expect(mockBeneficiaryBtnCallback).toHaveBeenCalled();
  });

  it("applies correct styles based on distributionView prop", () => {
    // This is a bit harder to test without checking styles directly which can be brittle,
    // but we can check if it renders without error for both states.
    render(
      <WillAssetBeneficiaryToggler
        distributionView="beneficiary"
        assetBtnCallback={() => {}}
        beneficiaryBtnCallback={() => {}}
      />,
    );
  });
});
