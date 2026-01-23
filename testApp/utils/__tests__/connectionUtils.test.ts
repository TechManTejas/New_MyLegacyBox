import { ConnectionUtils } from "../connectionUtils";

describe("ConnectionUtils", () => {
  it("should detect online status", async () => {
    const online = await ConnectionUtils.isOnline();
    expect(online).toBe(true);
  });

  it("should return correct error messages", () => {
    expect(ConnectionUtils.getErrorMessage(404)).toBe("Resource not found.");
    expect(ConnectionUtils.getErrorMessage(500)).toBe("Internal server error.");
  });
});
