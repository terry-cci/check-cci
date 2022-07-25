import { Marble } from "@/types/Marble";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

import map from "@/data/map.json";
import v, { Vector } from "@/utils/vector";
import { isInBound } from "@/utils/map";

const DIRECTIONS: Vector[] = [
  [-1, -1],
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
  [1, 1],
];
interface MainState {
  playerCount: number;
  marbles: Marble[];
  selectedMarbleId?: number;
  selectedDestination?: Vector;
  movableLocations: Vector[];
}

const initialState: MainState = {
  playerCount: 2,
  marbles: [],
  movableLocations: [],
};
v;
function getMoableLocations(state: Draft<MainState>, location: Vector) {
  const marbleOn = (location: Vector) =>
    state.marbles.find((marble) => v.equals(marble.location, location));

  const movableLocations: Vector[] = [];

  // adjacent locations
  DIRECTIONS.forEach((direction) => {
    const newLocation = v.add(location, direction);

    if (!isInBound(newLocation)) return;
    if (marbleOn(newLocation)) return;

    movableLocations.push(newLocation);
  });

  // jumping
  DIRECTIONS.forEach((direction) => {
    let currentLocation = location;
    let firstBlockingDistance: number | undefined;
    let distance = 0;

    while (true) {
      currentLocation = v.add(currentLocation, direction);
      distance++;

      if (!isInBound(currentLocation)) break;

      if (marbleOn(currentLocation)) {
        if (!firstBlockingDistance) {
          firstBlockingDistance = distance;
        } else {
          break;
        }
      } else if (
        firstBlockingDistance &&
        distance === firstBlockingDistance * 2
      ) {
        movableLocations.push(currentLocation);
        break;
      }
    }
  });

  return movableLocations;
}

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setPlayerCount: (
      state: Draft<MainState>,
      action: PayloadAction<number>
    ) => {
      state.playerCount = action.payload;
    },

    startGame: (state: Draft<MainState>) => {
      const teams =
        map.teamSetting[
          state.playerCount.toString() as keyof typeof map.teamSetting
        ];

      let marbleId = 1;
      state.marbles = teams.flatMap((teamIdx) => {
        const team = map.teams[teamIdx];

        const marbles = team.cells.map(([x, y]) => {
          const marble: Marble = {
            id: team.id * 100 + marbleId++,
            team: {
              id: team.id,
            },
            location: [x, y],
            color: team.color,
          };
          return marble;
        });

        return marbles;
      });

      state.movableLocations = [];
      state.selectedDestination = undefined;
      state.selectedMarbleId = undefined;
    },

    setMovableLocations: (
      state: Draft<MainState>,
      action: PayloadAction<Vector[]>
    ) => {
      state.movableLocations = action.payload;
    },

    selectMarble: (state: Draft<MainState>, action: PayloadAction<Marble>) => {
      state.selectedMarbleId = action.payload.id;
      state.selectedDestination = undefined;
      state.movableLocations = getMoableLocations(
        state,
        action.payload.location
      );
    },
    unselectMarble: (state: Draft<MainState>) => {
      state.selectedMarbleId = undefined;
    },

    selectDestination: (
      state: Draft<MainState>,
      action: PayloadAction<Vector>
    ) => {
      state.selectedDestination = action.payload;
    },

    confirmMove: (state: Draft<MainState>) => {
      const selectedMarble = state.marbles.find(
        (marble) => marble.id === state.selectedMarbleId
      );

      if (!selectedMarble) return;
      if (!state.selectedDestination) return;

      selectedMarble.location = state.selectedDestination;
      state.movableLocations = getMoableLocations(
        state,
        state.selectedDestination
      );

      state.selectedDestination = undefined;
    },

    unselectDestination: (state: Draft<MainState>) => {
      state.selectedDestination = undefined;
    },

    setMarbles: (state: Draft<MainState>, action: PayloadAction<Marble[]>) => {
      state.marbles = action.payload;
    },
  },
});

export const {
  setPlayerCount,
  startGame,
  setMarbles,
  selectMarble,
  unselectMarble,
  selectDestination,
  unselectDestination,
  confirmMove,
  setMovableLocations,
} = mainSlice.actions;

export default mainSlice.reducer;
