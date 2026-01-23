import { memoize } from "../memoizeUtils";

describe("memoize", () => {
  it("should cache results of function calls", () => {
    const mockFn = jest.fn((x: number) => x * 2);
    const memoizedFn = memoize(mockFn);

    expect(memoizedFn(2)).toBe(4);
    expect(memoizedFn(2)).toBe(4);
    expect(mockFn).toHaveBeenCalledTimes(1);

    expect(memoizedFn(3)).toBe(6);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
