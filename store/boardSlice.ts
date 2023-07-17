import boardSettings from "@/components/body/boardGame/boardSettings";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { is, update } from "ramda";
import { BoxValueProps } from "@/types/boardType";
import zukeeper from "zukeeper";

interface BoardSliceProps {
  board: any;
  boardUpdate: (
    id: number,
    col: number,
    row: number,
    isPlayer1: boolean
  ) => void;
}
const { MAX_BOX } = boardSettings;

const boardArray: any = new Array(MAX_BOX).fill({});

export const useBoardSlice = create<BoardSliceProps>(
  zukeeper((set, get) => ({
    board: boardArray,
    boardUpdate: (id, col, row, isPlayer1P) => {
      set((state) => ({
        board: update(
          id,
          { value: { row: row, col: col }, player1: isPlayer1P },
          state.board
        ),
      }));
    },
  }))
);

window.store = useBoardSlice;
