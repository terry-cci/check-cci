import { Marble } from "@/types/Marble";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

import map from "@/data/map.json";
import { Vector } from "@/utils/vector";

interface MainState {
  playerCount: number;
  marbles: Marble[];
  selectedMarbleId?: number;
  selectedDestination?: Vector;
}

const initialState: MainState = {
  playerCount: 2,
  marbles: [],
};

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
    },

    selectMarble: (state: Draft<MainState>, action: PayloadAction<Marble>) => {
      state.selectedMarbleId = action.payload.id;
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
      state.selectedMarbleId = undefined;
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
} = mainSlice.actions;

export default mainSlice.reducer;
