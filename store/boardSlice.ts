import boardSettings from "@/components/body/boardGame/boardSettings";
import { StateCreator, StoreApi, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BoxValueProps } from "@/types/types";
import { gomokuCal } from "@/services/boardRule";
import { devtools } from "zustand/middleware";
import axios from "axios";

export interface BoardSliceProps {
  board: {
    boardId: number;
    boardData: BoxValueProps[];
  } | null;
  setInitialBoard: (boardData: BoxValueProps[], boardId: number) => void;
  updateBox: (index: number) => void;
  boardWidth: number;
  setBoardWidth: (width: number) => void;
  boardStatus: "continue" | "over";
  boardStatusUpdate: () => void;
  currentPlayer: BoxValueProps["player"];
  gomokuCal: (index: number) => void;
}

type Middleware<S> = (
  config: StateCreator<S>
) => (
  set: StoreApi<S>["setState"],
  get: StoreApi<S>["getState"],
  api: StoreApi<S>
) => S;

const { MAX_BOX, MAX_COL } = boardSettings;

export const boardArray: BoxValueProps[] = new Array(MAX_BOX).fill({}).map(
  (value, index) =>
    (value = {
      id: index,
      col: index % MAX_COL,
      row: Math.floor(index / MAX_COL),
      player: undefined,
      isBlank: true,
    })
);

const boardMiddleware: Middleware<BoardSliceProps> =
  (config) => (set, get, api) =>
    config(
      async (...args) => {
        const prevBoard = get().board;

        console.log("  applying", args);
        set(...args);
        const newPlayer = get().currentPlayer;
        const newBoard = get().board;
        if (prevBoard && prevBoard !== newBoard) {
          axios.put("/api/board", newBoard).then((result) => {
            console.log(result);
          });
          axios.put("api/room", newPlayer).then((result) => {
            console.log(result);
          });
        }
      },
      get,
      api
    );

export const useBoardSlice = create<BoardSliceProps>()(
  boardMiddleware(
    immer(
      devtools((set, get) => ({
        board: null,

        setInitialBoard: (boardData, boardId) => {
          set((state) => {
            state.board = {
              boardId: boardId,
              boardData: boardData,
            };
          });
        },

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

            state.board!.boardData![index] = {
              ...state.board!.boardData[index],
              player: currentPlayer,
              isBlank: false,
            };
            const board = get().board;
            console.log(board);
          });
        },

        gomokuCal: (index) => {
          set((state) => {
            const currentBoard = get().board!.boardData;
            const currentPlayer = get().currentPlayer;

            const calWinner = gomokuCal(
              currentBoard!,
              currentBoard![index].col,
              currentBoard![index].row,
              currentPlayer
            );

            if (calWinner) {
              state.boardStatus = "over";
            } else {
              state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
            }
          });
        },
      }))
    )
  )
);
