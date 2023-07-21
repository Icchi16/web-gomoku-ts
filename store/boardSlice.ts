import boardSettings from "@/components/body/boardGame/boardSettings";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { is, map, update } from "ramda";
import { BoxValueProps } from "@/types/boardType";
import zukeeper from "zukeeper";

interface BoardSliceProps {
  board: BoxValueProps[];
  boardWidth: number;
  setBoardWidth: (width: number) => void;
  boardStatus: "continue" | "over";
  latestRow: number | undefined;
  latestCol: number | undefined;
  latestRowUpdate: (row: number) => void;
  latestColUpdate: (col: number) => void;
  boardStatusUpdate: () => void;
  boardUpdate: (
    id: number,
    col: number,
    row: number,
    isPlayer1: boolean
  ) => void;

  updateCol: (newCol: number, index: number) => void;
}
const { MAX_BOX, MAX_COL } = boardSettings;
const boardArray: BoxValueProps[] = new Array(MAX_BOX).fill({}).map(
  (value, index) =>
    (value = {
      id: index,
      col: index % MAX_COL,
      row: Math.floor(index / MAX_COL),
      isPlayer1: undefined,
      isBlank: true,
    })
);

export const useBoardSlice = create(
  immer<BoardSliceProps>((set, get) => ({
    board: boardArray,

    boardWidth: 0,
    setBoardWidth: (width) => set({ boardWidth: width }),

    boardStatus: "continue",
    latestRow: undefined,
    latestCol: undefined,
    latestRowUpdate: (row) => set({ latestRow: row }),
    latestColUpdate: (col) => set({ latestCol: col }),
    updateCol: (newCol, index) =>
      set((state) => {
        state.board[index] = { ...state.board[index], col: newCol };
      }),

    boardStatusUpdate: () => {
      set((state) => ({
        boardStatus: state.boardStatus === "continue" ? "over" : "continue",
      }));
    },

    boardUpdate: (id, col, row, isPlayer1) => {
      set((state) => ({
        board: update(
          id,
          {
            ...state.board[id],
            coordinate: { row: row, col: col },
            player1: isPlayer1,
            isBlank: !state.board[id].isBlank,
          },
          state.board
        ),
      }));
    },
  }))
);
