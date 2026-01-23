import { renderHook } from "@testing-library/react-hooks";
import { useDebounce } from "../useDebounce";

describe("useDebounce", () => {
  jest.useFakeTimers();

  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));
    expect(result.current).toBe("test");
  });

  it("should debounce value changes", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "initial" },
      },
    );

    rerender({ value: "updated" });
    expect(result.current).toBe("initial");

    jest.advanceTimersByTime(500);
    expect(result.current).toBe("updated");
  });
});
