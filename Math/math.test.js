// math.test.js
const math = require('./math');

describe('Math module tests', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(math.add(1, 2)).toBe(3);
  });

  test('subtracts 5 - 3 to equal 2', () => {
    expect(math.subtract(5, 3)).toBe(2);
  });

  test('multiplies 2 * 3 to equal 6', () => {
    expect(math.multiply(2, 3)).toBe(6);
  });

  test('divides 6 / 3 to equal 2', () => {
    expect(math.divide(6, 3)).toBe(2);
  });

  test('throws error when dividing by zero', () => {
    expect(() => math.divide(6, 0)).toThrow('Cannot divide by zero');
  });

  test('square root of 9 should be 3', () => {
    expect(math.sqrt(9)).toBe(3);
  });

  test('max of 5 and 10 should be 10', () => {
    expect(math.max(5, 10)).toBe(10);
  });
});
