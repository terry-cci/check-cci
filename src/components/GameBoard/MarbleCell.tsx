import React, { SyntheticEvent } from "react";

import v, { Vector } from "@/utils/vector";
import Positioner, { GAP } from "./Positioner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { confirmMove, selectDestination, selectMarble } from "@/store/main";

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
  const dispatch = useAppDispatch();

  const hinted = !!useAppSelector((state) =>
    state.main.movableLocations.find((location) =>
      v.equals(location, props.location)
    )
  );

  const selected = useAppSelector(
    (state) =>
      state.main.selectedDestination &&
      v.equals(state.main.selectedDestination, props.location)
  );

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    if (!hinted) return;

    if (selected) {
      dispatch(confirmMove());
      return;
    }

    dispatch(selectDestination(props.location));
  }

  return (
    <Positioner location={props.location} size={CELL_SIZE}>
      <div
        className={`gameboard__cell ${hinted ? "gameboard__cell--hinted" : ""} 
        ${selected ? "gameboard__cell--selected" : ""}`}
        onClick={handleClick}
      >
        {/* {v.toString(props.location)} */}
      </div>
    </Positioner>
  );
}
