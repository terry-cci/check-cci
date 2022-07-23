import { css } from "@emotion/react";
import React, { SyntheticEvent } from "react";

import v, { Matrix, Vector } from "@/utils/vector";

interface MarbelCellProps {
  active: boolean;
  loc: Vector;
  gap: number;
  handleClick: (e: SyntheticEvent) => void;
}

const skew: Matrix = [
  [1, 0],
  [-Math.cos(Math.PI / 3), Math.sin(Math.PI / 3)],
];

const origin: Vector = [50 * (1 - Math.cos(Math.PI / 6)), 25];

const CELL_SIZE_FACTOR = 1 / 2;

export default function MarbleCell(props: MarbelCellProps) {
  const cellSize: Vector = [
    props.gap * CELL_SIZE_FACTOR,
    props.gap * CELL_SIZE_FACTOR,
  ];
  const loc = v.sub(
    v.add(v.times(v.timesMatrix(props.loc, skew), props.gap), origin),
    v.times(cellSize, 1 / 2)
  );

  return (
    <div
      className={`gameboard__cell ${
        props.active ? "gameboard__cell--active" : ""
      }`}
      css={{
        width: `${cellSize[0]}%`,
        height: `${cellSize[1]}%`,
        left: `${loc[0]}%`,
        bottom: `${loc[1]}%`,
      }}
      onClick={props.handleClick}
    >
      {/* <span
        css={{
          position: "absolute",
        }}
      >
        ({props.loc[0]},{props.loc[1]})
      </span> */}
    </div>
  );
}
