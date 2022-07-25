import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import v, { Vector } from "@/utils/vector";
import { isInBound } from "@/utils/map";
import { Marble } from "@/types/Marble";

import HintCell from "./HintCell";

const DIRECTIONS: Vector[] = [
  [-1, -1],
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
  [1, 1],
];

export default function MovingHints() {
  const [movableLocations, setMovableLocations] = useState<Vector[]>([]);
  const selectedMarbleId = useAppSelector(
    (state) => state.main.selectedMarbleId
  );

  const marbles = useAppSelector((state) => state.main.marbles);

  const selectedMarble = selectedMarbleId
    ? (marbles.find((marble) => marble.id === selectedMarbleId) as Marble)
    : undefined;

  useEffect(() => {
    if (!selectedMarble) return;

    const marbleOn = (location: Vector) =>
      marbles.find((marble) => v.equals(marble.location, location));

    const newMovableLocations: Vector[] = [];

    // adjacent locations
    DIRECTIONS.forEach((direction) => {
      const location = v.add(selectedMarble.location, direction);

      if (!isInBound(location)) return;
      if (marbleOn(location)) return;

      newMovableLocations.push(location);
    });

    setMovableLocations(newMovableLocations);
  }, [selectedMarbleId, selectedMarble && v.toString(selectedMarble.location)]);

  return (
    <>
      {movableLocations.map((location) => (
        <HintCell location={location} key={v.toString(location)} />
      ))}
    </>
  );
}
