import boardSettings from "@/components/body/boardGame/boardSettings";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { is, map, update } from "ramda";
import { BoxValueProps } from "@/types/boardType";
import zukeeper from "zukeeper";

interface BoardSliceProps {
  board: any;
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
}
const { MAX_BOX } = boardSettings;
const boardArray: BoxValueProps[] = new Array(MAX_BOX)
  .fill({})
  .map((value, index) => (value = { id: index, isBlank: true }));

export const useBoardSlice = create<BoardSliceProps>((set, get) => ({
  board: boardArray,
  boardStatus: "continue",
  latestRow: undefined,
  latestCol: undefined,
  latestRowUpdate: (row) => set({ latestRow: row }),
  latestColUpdate: (col) => set({ latestCol: col }),

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
}));
