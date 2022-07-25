export type Vector = [x: number, y: number];
export type Matrix = [Vector, Vector];

export default {
  add(a: Vector, b: Vector) {
    return [a[0] + b[0], a[1] + b[1]] as Vector;
  },

  times(a: Vector, k: number) {
    return [a[0] * k, a[1] * k] as Vector;
  },

  sub(a: Vector, b: Vector) {
    return this.add(a, this.times(b, -1));
  },

  timesMatrix(a: Vector, m: Matrix) {
    return this.add(this.times(m[0], a[0]), this.times(m[1], a[1]));
  },

  equals(a: Vector, b: Vector) {
    return a[0] === b[0] && a[1] === b[1];
  },

  cmp(a: Vector, b: Vector) {
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  },

  toString(a: Vector) {
    return `(${a[0]}, ${a[1]})`;
  },
};
