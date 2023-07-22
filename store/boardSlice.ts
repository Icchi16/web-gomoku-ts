import boardSettings from "@/components/body/boardGame/boardSettings";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BoxValueProps } from "@/types/boardType";
import { usePlayerSlice } from "./playerSlice";

interface BoardSliceProps {
  board: BoxValueProps[];
  updateBox: (id: number) => void;
  boardWidth: number;
  setBoardWidth: (width: number) => void;
  boardStatus: "continue" | "over";
  boardStatusUpdate: () => void;
  currentPlayer: BoxValueProps["player"];
}

const { MAX_BOX, MAX_COL } = boardSettings;

const boardArray: BoxValueProps[] = new Array(MAX_BOX).fill({}).map(
  (value, index) =>
    (value = {
      id: index,
      col: index % MAX_COL,
      row: Math.floor(index / MAX_COL),
      player: undefined,
      isBlank: true,
    })
);

export const useBoardSlice = create(
  immer<BoardSliceProps>((set, get) => ({
    board: boardArray,

    currentPlayer: 1,

    boardWidth: 0,
    setBoardWidth: (width) => set({ boardWidth: width }),

    boardStatus: "continue",

    boardStatusUpdate: () => {
      set((state) => ({
        boardStatus: state.boardStatus === "continue" ? "over" : "continue",
      }));
    },

    updateBox: (index) => {
      set((state) => {
        const currentPlayer = state.currentPlayer;

        state.board[index] = {
          ...state.board[index],
          player: currentPlayer,
          isBlank: false,
        };

        state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
      });
    },
  }))
);
