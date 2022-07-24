import {
  createSlice,
  Draft,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";

interface MainState {
  playerCount: number;
}

const initialState: MainState = {
  playerCount: 2,
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
  },
});

export const { setPlayerCount } = mainSlice.actions;

export default mainSlice.reducer;
