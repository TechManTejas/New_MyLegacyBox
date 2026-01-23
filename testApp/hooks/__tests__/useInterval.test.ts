import { renderHook } from "@testing-library/react-hooks";
import { useInterval } from "../useInterval";

describe("useInterval", () => {
  jest.useFakeTimers();

  it("should call the callback at intervals", () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("should stop if delay is null", () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ delay }) => useInterval(callback, delay),
      {
        initialProps: { delay: 1000 },
      },
    );

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ delay: null });
    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
