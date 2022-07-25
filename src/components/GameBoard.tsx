import React, { SyntheticEvent, useState } from "react";

import "@/styles/GameBoard.css";

import map from "@/data/map.json";
import MarbleCell from "./GameBoard/MarbleCell";
import v, { Vector } from "@/utils/vector";
import { useAppSelector } from "@/store/hooks";
import Marble from "./GameBoard/Marble";

export default function GameBoard() {
  const marbles = useAppSelector((state) => state.main.marbles);

  return (
    <div className="gameboard">
      {map.bounds.map(([start, end], x) => {
        const row = [];
        for (let y = start; y <= end; y++) {
          const location: Vector = [x, y];

          row.push(
            <MarbleCell key={location.toString()} location={location} />
          );
        }
        return row;
      })}

      {marbles.map((marble) => (
        <Marble marble={marble} key={marble.id} />
      ))}
    </div>
  );
}
