import boardSettings from "@/components/body/boardGame/boardSettings";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { is, update } from "ramda";
import { BoxValueProps } from "@/types/boardType";
import zukeeper from "zukeeper";

interface BoardSliceProps {
  board: any;
  latestRow: number;
  latestCol: number;
  latestRowUpdate: (row: number) => void;
  latestColUpdate: (col: number) => void;
  boardUpdate: (
    id: number,
    col: number,
    row: number,
    isPlayer1: boolean
  ) => void;
}
const { MAX_BOX } = boardSettings;

const boardArray: any = new Array(MAX_BOX).fill({});

export const useBoardSlice = create<BoardSliceProps>((set, get) => ({
  board: boardArray,
  latestRow: -100,
  latestCol: -100,
  latestRowUpdate: (row) => set({ latestRow: row }),
  latestColUpdate: (col) => set({ latestCol: col }),
  boardUpdate: (id, col, row, isPlayer1P) => {
    set((state) => ({
      board: update(
        id,
        { value: { row: row, col: col }, player1: isPlayer1P },
        state.board
      ),
    }));
  },
}));
