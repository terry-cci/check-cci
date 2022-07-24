import React, { SyntheticEvent, useState } from "react";

import "@/styles/GameBoard.css";

import map from "@/data/map.json";
import MarbleCell from "./MarbleCell";
import v, { Vector } from "@/utils/vector";

const cellGap = (100 * Math.cos(Math.PI / 6)) / 12;

export default function GameBoard() {
  const [selectedCells, setSelectedCells] = useState<Vector[]>([]);

  function handleCellClick(e: SyntheticEvent, loc: Vector) {
    setSelectedCells((cells) => {
      const exist = !!cells.find((cell) => v.equals(cell, loc));

      let newCells: Vector[];
      if (exist) {
        newCells = cells.filter((cell) => !v.equals(cell, loc));
      } else {
        newCells = [...cells, loc];
      }
      newCells.sort(v.cmp);
      return newCells;
    });
  }

  return (
    <div className="gameboard">
      {map.bounds.map(([start, end], x) => {
        const row = [];
        for (let y = start; y <= end; y++) {
          const loc: Vector = [x, y];
          row.push(
            <MarbleCell
              active={!!selectedCells.find((cell) => v.equals(cell, loc))}
              key={loc.toString()}
              loc={loc}
              gap={cellGap}
              handleClick={(e) => handleCellClick(e, loc)}
            />
          );
        }
        return row;
      })}
    </div>
  );
}
