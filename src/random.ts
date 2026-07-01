export function integerInRange(min: number, max: number): number {
  if (!Number.isInteger(min)) {
    throw new TypeError("min must be an integer");
  }

  if (!Number.isInteger(max)) {
    throw new TypeError("max must be an integer");
  }

  if (min > max) {
    throw new RangeError("min must be less than or equal to max");
  }

  if (min === max) {
    return min;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
