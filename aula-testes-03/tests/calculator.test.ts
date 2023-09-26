import calculator from "../src/calculator";

describe("Math functions", () => {
  it("should return the addition of two numbers", () => {
    expect(calculator.sum(1, 2)).toBe(3);
  });

  it("should return the subtraction of two numbers", () => {
    expect(calculator.sub(2, 1)).toBe(1);
  });

  it("should return the multiplication of two numbers", () => {
    expect(calculator.mul(2, 2)).toBe(4);
  });

  it("should return the division of two numbers", () => {
    expect(calculator.div(2, 2)).toBe(1);
  });
});
