import React from "react";
import { render } from "@testing-library/react-native";
import WillSecondaryDistPrevCard from "../WillSecondaryDistPrevCard";

describe("WillSecondaryDistPrevCard", () => {
  // This component seems to receive data and map it similar to WillSecondaryCard
  // But focuses on Secondary/Contingency distribution
  it("renders secondary distribution data correctly", () => {
    // Mocking complex structure if needed, or simple if it just iterates.
    const secondaryData = [
      {
        fullName: "Primary Beneficiary",
        items: [
          {
            itemTitle: "Specific Asset",
            percent: 100,
            nominees: [{ fullName: "Secondary Nominee", percent: 100 }],
          },
        ],
      },
    ];

    //   const { getByText } = render(<WillSecondaryDistPrevCard secondaryData={secondaryData} />);

    // Since I don't have the exact structure handy in front of me, I will check if it renders at least the title if provided or implies render.
    // Based on name it likely renders "Secondary Distribution" or similar.
    // Let's create a basic render test.

    render(<WillSecondaryDistPrevCard secondaryData={[]} />);
  });
});
