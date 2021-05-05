const { sum, sumOf } = require("./sum");

describe("sum test", () => {
  it("1 + 2 == 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
  it("calculate all numbers in array", () => {
    expect(sumOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(55);
  });
});
