export const clamp = (value: number, max: number, min: number = 0) =>
  Math.min(Math.max(value, min), max);
