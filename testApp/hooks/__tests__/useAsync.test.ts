import { renderHook, act } from "@testing-library/react-hooks";
import { useAsync } from "../useAsync";

describe("useAsync", () => {
  it("should handle successful async operations", async () => {
    const mockAsync = () => Promise.resolve("data");
    const { result, waitForNextUpdate } = renderHook(() => useAsync(mockAsync));

    act(() => {
      result.current.execute();
    });

    expect(result.current.status).toBe("pending");
    await waitForNextUpdate();

    expect(result.current.status).toBe("success");
    expect(result.current.value).toBe("data");
  });

  it("should handle failed async operations", async () => {
    const mockAsync = () => Promise.reject("error");
    const { result, waitForNextUpdate } = renderHook(() => useAsync(mockAsync));

    act(() => {
      result.current.execute();
    });

    await waitForNextUpdate();

    expect(result.current.status).toBe("error");
    expect(result.current.error).toBe("error");
  });
});
