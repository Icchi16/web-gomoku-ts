import boardSettings from "@/components/body/boardGame/boardSettings";
import { create } from "zustand";
import { is, update } from "ramda";
import { BoxValueProps } from "@/types/boardType";

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

export const useBoardSlice = create<BoardSliceProps>((set) => ({
  board: boardArray,
  boardUpdate: (id, col, row, isPlayer1P) =>
    set((state) => ({
      // board: update(
      //   id,
      //   { value: { row: row, col: col }, player1: isPlayer1P },
      //   state.board
      // ),

      board: state.board.map(() => {
        return "z";
      }),
    })),
}));
