import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { confirmMove, selectDestination } from "@/store/main";
import v, { Vector } from "@/utils/vector";
import React from "react";
import { CELL_SIZE } from "./MarbleCell";
import Positioner from "./Positioner";

interface HintCellProps {
  location: Vector;
}

export default function HintCell(props: HintCellProps) {
  const dispatch = useAppDispatch();

  const selected = useAppSelector(
    (state) =>
      state.main.selectedDestination &&
      v.equals(state.main.selectedDestination, props.location)
  );

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    if (selected) {
      dispatch(confirmMove());
      return;
    }

    dispatch(selectDestination(props.location));
  }

  return (
    <Positioner location={props.location} size={CELL_SIZE}>
      <div
        className={`gameboard__hint-cell ${
          selected ? "gameboard__hint-cell--selected" : ""
        }`}
        onClick={handleClick}
      ></div>
    </Positioner>
  );
}
