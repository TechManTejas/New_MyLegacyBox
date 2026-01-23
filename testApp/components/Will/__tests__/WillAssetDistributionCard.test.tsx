import React from "react";
import { render } from "@testing-library/react-native";
import { useSelector } from "react-redux";
import WillAssetDistributionCard from "../WillAssetDistributionCard";

describe("WillAssetDistributionCard", () => {
  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockReturnValue([
      {
        itemTitle: "House",
        allocations: {
          ben1: 60,
          ben2: 40,
        },
      },
    ]);
  });

  it("renders asset titles and allocations", () => {
    const beneficiariesMap = {
      ben1: { fullName: "Ben 1" },
      ben2: { fullName: "Ben 2" },
    };

    const { getByText } = render(
      <WillAssetDistributionCard beneficiariesMap={beneficiariesMap} />,
    );

    expect(getByText("House")).toBeTruthy();
    expect(getByText("Ben 1")).toBeTruthy();
    expect(getByText("60 %")).toBeTruthy();
    expect(getByText("Ben 2")).toBeTruthy();
    expect(getByText("40 %")).toBeTruthy();
  });
});
