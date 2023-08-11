import boardSettings from "@/components/body/boardGame/boardSettings";
import { StateCreator, StoreApi, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BoxValueProps } from "@/types/types";
import { gomokuCal } from "@/services/boardRule";
import { combine, devtools } from "zustand/middleware";
import axios from "axios";
import { Database } from "@/types/supabase.types";
import { BoardData, RoomData } from "@/app/[roomId]/page";
import { filter } from "ramda";
import supabase from "@/libs/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import next from "next";

export interface BoardSliceProps {
  board: BoardData | null;
  setBoard: (boardData: BoardData) => void;

  room: RoomData | null;
  setRoom: (RoomData: RoomData) => void;

  updateBox: (index: number) => void;

  boardWidth: number;
  setBoardWidth: (width: number) => void;

  boardStatus: "continue" | "over";
  boardStatusUpdate: () => void;

  gomokuCal: (index: number) => void;
}

// Partial<BoardSliceProps> | ((state: BoardSliceProps) => BoardSliceProps | Partial<...>)

const { MAX_BOX, MAX_COL } = boardSettings;

export const boardArray: BoxValueProps[] = new Array(MAX_BOX).fill({}).map(
  (value, index) =>
    (value = {
      id: index,
      col: index % MAX_COL,
      row: Math.floor(index / MAX_COL),
      player: null,
      isBlank: true,
    })
);

type Middleware<S> = (
  config: StateCreator<S>
) => (
  set: StoreApi<S>["setState"],
  get: StoreApi<S>["getState"],
  api: StoreApi<S>
) => S;

const boardMiddleware: Middleware<BoardSliceProps> = (config) =>
  immer(
    devtools((set, get, api) =>
      config(
        async (...args) => {
          const prevBoard = get().board;
          const prevPlayer = get().room?.currentPlayer;

          set(...args);
          const newBoard = get().board;
          const newPlayer = get().room?.currentPlayer;
          if (prevBoard && prevBoard !== newBoard) {
            axios.put("/api/board", newBoard).then((result) => {
              console.log(result);
            });
          }

          if (prevPlayer && prevPlayer !== newPlayer) {
            const newRoom = {
              ...get().room,
              currentPlayer: newPlayer,
              isOver: get().boardStatus === "over" ? true : false,
              lastPlayedAt: new Date(Date.now()),
            };

            axios.put("api/room", newRoom).then((result) => {
              console.log(result);
            });
          }
        },
        get,
        api
      )
    )
  );

export const useBoardSlice = create<BoardSliceProps>()(
  boardMiddleware(
    // immer(
    //   devtools(
    (set, get) => ({
      board: null,

      setBoard: (boardData: BoardData) => {
        set((state) => {
          return {
            ...state,
            board: {
              boardId: boardData.boardId,
              boxData: boardData.boxData,
            },
          };
        });
      },

      room: null,

      setRoom: (roomData: RoomData) => {
        set((state) => {
          return {
            ...state,
            room: {
              roomId: roomData.roomId,
              players: roomData.players,
              currentPlayer: roomData.currentPlayer,
            },
          };
        });
      },

      boardWidth: 0,
      setBoardWidth: (width) => {
        set((state) => {
          return { ...state, boardWidth: width };
        });
      },

      boardStatus: "continue",

      boardStatusUpdate: () => {
        set((state) => {
          return {
            ...state,
            boardStatus: state.boardStatus === "continue" ? "over" : "continue",
          };
        });
      },

      updateBox: (index) => {
        set((state) => {
          const currentPlayer = get().room!.currentPlayer!;
          const newBoardData = [...state.board!.boxData!];
          newBoardData[index] = {
            ...newBoardData[index],
            player: currentPlayer,
            isBlank: false,
          };

          return {
            ...state,
            board: { ...state.board!, boxData: newBoardData },
          };
        });
      },

      gomokuCal: (index) => {
        set((state) => {
          const currentBoard = get().board!.boxData!;
          const currentPlayer = get().room!.currentPlayer!;
          const players = get().room!.players!;

          const calWinner = gomokuCal(
            currentBoard,
            currentBoard[index].col,
            currentBoard[index].row,
            currentPlayer
          );

          if (calWinner) {
            return { ...state, boardStatus: "over" };
          } else {
            const nextPlayer: string[] = filter(
              (player) => player !== currentPlayer,
              players
            );

            return {
              ...state,
              room: { ...state.room!, currentPlayer: nextPlayer[0] },
            };
          }
        });
      },
    })
  )
  // )
);
// );
