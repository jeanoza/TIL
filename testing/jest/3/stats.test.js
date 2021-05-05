const stats = require("./stats");

describe("stats", () => {
  it("max", () => {
    expect(stats.max([1, 2, 3, 4, 5])).toBe(5);
  });
  it("min", () => {
    expect(stats.min([1, 2, 3, 4, 5])).toBe(1);
  });
  it("avg", () => {
    expect(stats.avg([1, 2, 3, 4, 5])).toBe(3);
  });
  describe("median", () => {
    it("sort", () => {
      expect(stats.sort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });
    it("median for odd length array", () => {
      expect(stats.median([1, 5, 4, 3, 2])).toBe(4);
    });
    it("median for even length array", () => {
      expect(stats.median([1, 5, 4, 3, 2, 6])).toBe(3.5);
    });
  });
  describe("frequency", () => {
    it("[one frequency number", () => {
      expect(stats.frequency([1, 2, 2, 2, 3])).toBe(2);
    });
    it("[no frequency number]", () => {
      expect(stats.frequency([1, 1, 2, 2, 3, 3])).toBe(null);
    });
    it("multiple frequency number]", () => {
      expect(stats.frequency([1, 2, 2, 3, 3, 4])).toEqual([2, 3]);
    });
  });
});
