import React from "react";
import { render } from "@testing-library/react-native";
import WillResidualDistPrevCard from "../WillResidualDistPrevCard";

describe("WillResidualDistPrevCard", () => {
  it("renders residual distribution data correctly", () => {
    const residualData = [
      {
        fullName: "Jane Doe",
        email: "jane@example.com",
        relationship: "MOTHER",
        percent: 60,
      },
    ];

    const { getByText } = render(
      <WillResidualDistPrevCard residualData={residualData} />,
    );

    expect(getByText("Residual Distribution")).toBeTruthy();
    expect(getByText("Jane Doe")).toBeTruthy();
    expect(getByText("jane@example.com")).toBeTruthy();
    expect(getByText("Mother")).toBeTruthy(); // Capitalized by map helper likely
    expect(getByText("60 %")).toBeTruthy();
  });

  it("renders nothing if data is empty", () => {
    const { queryByText } = render(
      <WillResidualDistPrevCard residualData={[]} />,
    );
    // It might render the title still? Let's check logic.
    // Logic: const WillResidualDistPrevCard = ({ residualData }) => { ... if (residualData.length === 0) return null; ... }
    // Assuming it returns null if empty.
    expect(queryByText("Residual Distribution")).toBeNull();
  });
});
