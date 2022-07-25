import React, { SyntheticEvent } from "react";

import { Vector } from "@/utils/vector";
import Positioner, { GAP } from "./Positioner";

interface MarbelCellProps {
  location: Vector;
  handleClick?: (e: SyntheticEvent) => void;
}

const CELL_SIZE_FACTOR = 1 / 2;
export const CELL_SIZE: Vector = [
  GAP * CELL_SIZE_FACTOR,
  GAP * CELL_SIZE_FACTOR,
];

export default function MarbleCell(props: MarbelCellProps) {
  return (
    <Positioner location={props.location} size={CELL_SIZE}>
      <div className="gameboard__cell">
        {/* {v.toString(props.location)} */}
      </div>
    </Positioner>
  );
}
