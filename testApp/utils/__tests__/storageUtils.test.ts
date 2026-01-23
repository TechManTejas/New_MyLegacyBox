import { StorageUtils } from "../storageUtils";

describe("StorageUtils", () => {
  beforeEach(() => {
    StorageUtils.clear();
  });

  it("should set and get items correctly", () => {
    StorageUtils.setItem("user", { name: "John" });
    expect(StorageUtils.getItem("user")).toEqual({ name: "John" });
  });

  it("should remove items correctly", () => {
    StorageUtils.setItem("test", "value");
    StorageUtils.removeItem("test");
    expect(StorageUtils.getItem("test")).toBeNull();
  });
});
