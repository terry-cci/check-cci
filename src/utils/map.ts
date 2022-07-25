import { Vector } from "./vector";
import map from "@/data/map.json";

export const isInBound = (location: Vector) =>
  map.bounds[location[0]][0] <= location[1] &&
  map.bounds[location[0]][1] >= location[1];
