import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface playerState {
  player1: boolean;
}

const initialState: playerState = { player1: true };

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changePlayer: (state) => {
      state.player1 = !state.player1;
    },
  },
});

export const { changePlayer } = playerSlice.actions;

export const playerValue = (state: RootState) => state.player.player1;
export default playerSlice.reducer;
