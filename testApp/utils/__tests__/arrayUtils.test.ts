import { uniqueArray, chunkArray } from "../arrayUtils";

describe("arrayUtils", () => {
  describe("uniqueArray", () => {
    it("should remove duplicates", () => {
      expect(uniqueArray([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
    });
  });

  describe("chunkArray", () => {
    it("should chunk arrays correctly", () => {
      expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });
  });
});
