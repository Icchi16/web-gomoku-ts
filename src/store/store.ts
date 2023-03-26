import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../slices/player/playerSlices";
import boardReducer from "../slices/board/board";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
