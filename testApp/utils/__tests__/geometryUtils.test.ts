import { GeometryUtils } from "../geometryUtils";

describe("GeometryUtils", () => {
  it("should calculate distance correctly", () => {
    // New York to London ~5570km
    const distance = GeometryUtils.calculateDistance(
      40.7128,
      -74.006,
      51.5074,
      -0.1278,
    );
    expect(distance).toBeGreaterThan(5500);
    expect(distance).toBeLessThan(5600);
  });

  it("should format positions correctly", () => {
    expect(GeometryUtils.formatPosition(12.34567, 76.54321)).toBe(
      "12.3457°, 76.5432°",
    );
  });
});
