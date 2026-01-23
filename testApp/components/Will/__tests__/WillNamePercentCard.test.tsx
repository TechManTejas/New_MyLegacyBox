import React from "react";
import { render } from "@testing-library/react-native";
import { useSelector } from "react-redux";
import WillNamePercentCard from "../WillNamePercentCard";
import { useGetWillQuery } from "../../../redux/api/will/willApiSlice";
import { useRoute } from "@react-navigation/native";

// Mock the hooks
jest.mock("../../../redux/api/will/willApiSlice", () => ({
  useGetWillQuery: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useRoute: jest.fn(),
}));

describe("WillNamePercentCard", () => {
  beforeEach(() => {
    (useGetWillQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        data: {
          beneficiaries: [{ _id: "1", fullName: "John Doe" }],
        },
      },
      isLoading: false,
      isFetching: false,
    });

    (useSelector as unknown as jest.Mock).mockReturnValue([
      { _id: "1", fullName: "John Doe (Redux)" },
    ]);
  });

  it("renders correctly for WILL_PREVIEW_SCREEN using Redux data", () => {
    (useRoute as unknown as jest.Mock).mockReturnValue({
      name: "WILL_PREVIEW_SCREEN",
    });

    const { getByText } = render(<WillNamePercentCard _id="1" percent={50} />);

    expect(getByText("John Doe (Redux)")).toBeTruthy();
    expect(getByText("50 %")).toBeTruthy();
  });

  it("renders correctly for other screens using API data", () => {
    (useRoute as unknown as jest.Mock).mockReturnValue({
      name: "OTHER_SCREEN",
    });

    const { getByText } = render(<WillNamePercentCard _id="1" percent={75} />);

    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("75 %")).toBeTruthy();
  });
});
