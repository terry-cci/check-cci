import { Vector } from "@/utils/vector";

export type Team = {
  id: number;
};

export type Marble = {
  team: Team;
  location: Vector;
};
