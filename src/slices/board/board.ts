import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface boardState {
  boardWidth: number;
  boxWidth: number;
  BOX_PER_ROW: number;
  BOX_ROW: number;
}

const initialState: boardState = {
  boardWidth: 0,
  boxWidth: 0,
  BOX_PER_ROW: 30,
  BOX_ROW: 16,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    resizeBoard: (state, action: PayloadAction<number>) => {
      state.boardWidth = action.payload;
      state.boxWidth = Math.floor((state.boardWidth - 1) / state.BOX_PER_ROW);
    },
  },
});

export const { resizeBoard } = boardSlice.actions;

export const boardWidthValue = (state: RootState) => state.board.boardWidth;
export const boxWidthValue = (state: RootState) => state.board.boxWidth;
export const BOX_PER_ROW = (state: RootState) => state.board.BOX_PER_ROW;
export const BOX_ROW = (state: RootState) => state.board.BOX_ROW;
export default boardSlice.reducer;
