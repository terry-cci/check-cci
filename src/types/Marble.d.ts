import { Vector } from "@/utils/vector";

export type Team = {
  id: number;
};

export type Marble = {
  id: number;
  team: Team;
  location: Vector;
  color: string;
};
