import { css } from "@emotion/react";
import React, { SyntheticEvent } from "react";

import v, { Matrix, Vector } from "@/utils/vector";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Marble from "./Marble";
import { selectDestination } from "@/store/main";
import Positioner, { GAP } from "./Positioner";

interface MarbelCellProps {
  location: Vector;
  handleClick?: (e: SyntheticEvent) => void;
}

const CELL_SIZE_FACTOR = 1 / 2;
const CELL_SIZE: Vector = [GAP * CELL_SIZE_FACTOR, GAP * CELL_SIZE_FACTOR];

export default function MarbleCell(props: MarbelCellProps) {
  const dispatch = useAppDispatch();

  const marble = useAppSelector((state) =>
    state.main.marbles.find((marble) =>
      v.equals(marble.location, props.location)
    )
  );

  function handleClick() {
    if (marble) return;
    dispatch(selectDestination(props.location));
  }

  const selectedDestination = useAppSelector(
    (state) => state.main.selectedDestination
  );

  return (
    <Positioner location={props.location} size={CELL_SIZE}>
      <div
        className={`gameboard__cell ${
          selectedDestination && v.equals(selectedDestination, props.location)
            ? "gameboard__cell--selected"
            : ""
        }`}
        onClick={handleClick}
      ></div>
    </Positioner>
  );
}
