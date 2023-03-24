import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface boardState {
  boardWidth: number;
  BOX_PER_ROW: number;
  BOX_ROW: number;
}

const initialState: boardState = {
  boardWidth: 0,
  BOX_PER_ROW: 30,
  BOX_ROW: 15,
};

export const boardSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    resizeBoard: (state, action: PayloadAction<number>) => {
      state.boardWidth = action.payload;
    },
  },
});

export const { resizeBoard } = boardSlice.actions;

export const boardValue = (state: RootState) => state.player.player1;
export default boardSlice.reducer;
