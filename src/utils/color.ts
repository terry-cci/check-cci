import { clamp } from "./math";

export const lightenHex = (color: string, amount: number) => {
  const number = parseInt(color.slice(1), 16);

  const newR = clamp((number >> 16) + amount, 255);
  const newG = clamp(((number >> 8) & 0xff) + amount, 255);
  const newB = clamp((number & 0xff) + amount, 255);

  return `#${((newR << 16) | (newG << 8) | newB)
    .toString(16)
    .padStart(6, "0")}`;
};
