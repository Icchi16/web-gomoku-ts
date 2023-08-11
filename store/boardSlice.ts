import boardSettings from "@/components/body/boardGame/boardSettings";
import { StateCreator, StoreApi, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BoxValueProps } from "@/types/types";
import { gomokuCal } from "@/services/boardRule";
import { devtools } from "zustand/middleware";
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

  currentPlayer: RoomData["currentPlayer"] | null;
  changeCurrentPlayer: (currentPlayer: RoomData["currentPlayer"]) => void;

  updateBox: (index: number) => void;

  boardWidth: number;
  setBoardWidth: (width: number) => void;

  boardStatus: "continue" | "over";
  boardStatusUpdate: () => void;

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
      player: null,
      isBlank: true,
    })
);

const boardMiddleware: Middleware<BoardSliceProps> =
  (config) => (set, get, api) =>
    config(
      async (...args) => {
        const prevBoard = get().board;

        set(...args);
        const newBoard = get().board;
        const currentPlayer = get().currentPlayer;

        if (prevBoard && prevBoard !== newBoard) {
          const nextPlayer: string[] = filter(
            (player) => player !== currentPlayer,
            get().room!.players!
          );
          const newRoom = {
            ...get().room,
            currentPlayer: nextPlayer[0],
            isOver: get().boardStatus === "over" ? true : false,
            lastPlayedAt: new Date(Date.now()),
          };
          axios.put("/api/board", newBoard).then((result) => {
            console.log(result);
          });
          axios.put("api/room", newRoom).then((result) => {
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

        setBoard: (boardData: BoardData) => {
          set((state) => {
            state.board = {
              boardId: boardData.boardId,
              boxData: boardData.boxData,
            };
          });
        },

        room: null,

        setRoom: (roomData: RoomData) => {
          set((state) => {
            state.room = {
              roomId: roomData.roomId,
              players: roomData.players,
            };
          });
        },

        currentPlayer: null,
        changeCurrentPlayer: (currentPlayer) => {
          set((state) => {
            state.currentPlayer = currentPlayer;
          });
        },

        boardWidth: 0,
        setBoardWidth: (width) => {
          set((state) => {
            state.boardWidth = width;
          });
        },

        boardStatus: "continue",

        boardStatusUpdate: () => {
          set((state) => {
            state.boardStatus =
              state.boardStatus === "continue" ? "over" : "continue";
          });
        },

        updateBox: (index) => {
          set((state) => {
            const currentPlayer = get().currentPlayer;

            state.board!.boxData![index] = {
              ...state.board!.boxData![index],
              player: currentPlayer!,
              isBlank: false,
            };
          });
        },

        gomokuCal: (index) => {
          set((state) => {
            const currentBoard = get().board!.boxData!;
            const currentPlayer = get().currentPlayer!;

            const calWinner = gomokuCal(
              currentBoard,
              currentBoard[index].col,
              currentBoard[index].row,
              currentPlayer
            );

            if (calWinner) {
              state.boardStatus = "over";
            } else {
              const nextPlayer = filter(
                (player) => player !== currentPlayer,
                state.room!.players!
              );

              state.currentPlayer = nextPlayer[0];
            }
          });
        },
      }))
    )
  )
);

// export const useBoardSlice = create<BoardSliceProps>()(
//   // boardMiddleware(
//   immer(
//     devtools((set, get) => ({
//       board: null,

//       setBoard: (boardData) => {
//         set((state) => {
//           state.board = {
//             boardId: boardData.boardId,
//             boxData: boardData.boxData,
//           };
//         });
//       },

//       room: null,

//       setRoom: (roomData: RoomData) => {
//         set((state) => {
//           state.room = {
//             roomId: roomData.roomId,
//             players: roomData.players,
//             currentPlayer: roomData.currentPlayer,
//           };
//         });
//       },

//       boardWidth: 0,
//       setBoardWidth: (width) => set({ boardWidth: width }),

//       boardStatus: "continue",

//       boardStatusUpdate: () => {
//         set((state) => ({
//           boardStatus: state.boardStatus === "continue" ? "over" : "continue",
//         }));
//       },

//       updateBox: (index) => {
//         set((state) => {
//           const currentPlayer = state.room?.currentPlayer;

//           state.board!.boxData![index] = {
//             ...state.board!.boxData![index],
//             player: currentPlayer!,
//             isBlank: false,
//           };
//           const board = get().board;
//           console.log(board);
//         });
//       },

//       gomokuCal: (index) => {
//         set((state) => {
//           const currentBoard = state.board?.boxData;
//           const currentPlayer = state.room?.currentPlayer;

//           const calWinner = gomokuCal(
//             currentBoard!,
//             currentBoard![index].col,
//             currentBoard![index].row,
//             currentPlayer
//           );

//           if (calWinner) {
//             state.boardStatus = "over";
//           } else {
//             state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
//           }
//         });
//       },
//     }))
//   )
//   // )
// );
