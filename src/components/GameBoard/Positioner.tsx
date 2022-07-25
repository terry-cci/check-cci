import v, { Matrix, Vector } from "@/utils/vector";
import { css } from "@emotion/react";
import React from "react";

interface PositionerProps {
  location: Vector;
  size: Vector;
  children?: JSX.Element;
}

const skew: Matrix = [
  [1, 0],
  [-Math.cos(Math.PI / 3), Math.sin(Math.PI / 3)],
  // [0, 1],
];

export const GAP = (100 * Math.cos(Math.PI / 6)) / 12;
export const ORIGIN: Vector = [50 * (1 - Math.cos(Math.PI / 6)), 25];

export default function Positioner(props: PositionerProps) {
  const renderLocation = v.sub(
    v.add(v.times(v.timesMatrix(props.location, skew), GAP), ORIGIN),
    v.times(props.size, 1 / 2)
  );

  const style = css({
    position: "absolute",
    width: `${props.size[0]}%`,
    height: `${props.size[1]}%`,
    left: `${renderLocation[0]}%`,
    bottom: `${renderLocation[1]}%`,
  });

  return (
    <div css={style} className="gameboard__positioner">
      {props.children}
    </div>
  );
}
