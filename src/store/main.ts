import { Marble } from "@/types/Marble";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

import map from "@/data/map.json";

interface MainState {
  playerCount: number;
  marbles: Marble[];
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
      state.marbles = teams.flatMap((team, idx) =>
        map.teams[team].cells.map(
          ([x, y]) =>
            ({
              team: {
                id: idx,
              },
              location: [x, y],
            } as Marble)
        )
      );
    },

    setMarbles: (state: Draft<MainState>, action: PayloadAction<Marble[]>) => {
      state.marbles = action.payload;
    },
  },
});

export const { setPlayerCount, startGame, setMarbles } = mainSlice.actions;

export default mainSlice.reducer;
