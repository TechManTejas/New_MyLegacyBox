import { renderHook } from "@testing-library/react-hooks";
import { useEventListener } from "../useEventListener";

describe("useEventListener", () => {
  it("should add and remove listener correctly", () => {
    const handler = jest.fn();
    const mockElement = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    const { unmount } = renderHook(() =>
      useEventListener("click", handler, mockElement),
    );

    expect(mockElement.addEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
    );

    unmount();
    expect(mockElement.removeEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
    );
  });
});
