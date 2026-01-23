import { renderHook, act } from "@testing-library/react-hooks";
import { useBoolean } from "../useBoolean";

describe("useBoolean", () => {
  it("should initialize with provided value", () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current.value).toBe(true);
  });

  it("should toggle, setTrue, and setFalse", () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.setTrue();
    });
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(false);

    act(() => {
      result.current.setFalse();
    });
    expect(result.current.value).toBe(false);
  });
});
