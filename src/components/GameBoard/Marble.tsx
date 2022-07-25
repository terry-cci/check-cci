import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectMarble } from "@/store/main";
import { Marble as MarbleType } from "@/types/Marble";
import { lightenHex } from "@/utils/color";
import v, { Vector } from "@/utils/vector";
import { css } from "@emotion/react";
import React from "react";
import Positioner, { GAP } from "./Positioner";

interface MarbleProps {
  marble: MarbleType;
}

const MARBLE_SIZE_FACTOR = 2 / 3;
const MARBLE_SIZE: Vector = [
  GAP * MARBLE_SIZE_FACTOR,
  GAP * MARBLE_SIZE_FACTOR,
];

export default function Marble(props: MarbleProps) {
  const selectedMarbleId = useAppSelector(
    (state) => state.main.selectedMarbleId
  );

  const dispatch = useAppDispatch();
  function handleClick() {
    dispatch(selectMarble(props.marble));
  }

  const style = css({
    "--marble-color": props.marble.color,
    "--lighten-marble-color": lightenHex(props.marble.color, 100),
  });

  return (
    <Positioner location={props.marble.location} size={MARBLE_SIZE}>
      <div
        className={`gameboard__marble ${
          selectedMarbleId === props.marble.id
            ? "gameboard__marble--selected"
            : ""
        }`}
        onClick={handleClick}
        css={style}
      >
        {/* {props.marble.id} */}
      </div>
    </Positioner>
  );
}
