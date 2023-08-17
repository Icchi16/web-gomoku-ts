"use client";

import { useBoardSlice } from "@/store/boardSlice";
import BoardBox from "./BoardBox";
import boardSettings from "./boardSettings";
import { useElementSize } from "usehooks-ts";
import { useLayoutEffect, useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "@/hooks/useTheme";
import BoardLoading from "./BoardLoading";
import { useUser } from "@/hooks/useUser";
import { useParams, useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/supabase.types";
import MatchOverComp from "./MatchOverComp";
import useRoom from "@/hooks/useRoom";
import { RoomDetails } from "@/types/types";

const Board = () => {
  const { isLoading: isLoadingRoom, roomDetails } = useRoom();

  const currentPlayer = roomDetails?.currentPlayer;
  const players = roomDetails?.players;

  const { isLoading: isLoadingUser, userDetails } = useUser();
  const userId = userDetails?.id;

  const { border } = useTheme().colors;
  const board = useBoardSlice((state) => state.room)?.boardData;
  const currentPlayerStore = useBoardSlice(
    (state) => state.room?.currentPlayer
  );

  const setRoom = useBoardSlice((state) => state.setRoom);

  const gameStatus = useBoardSlice((state) => state.boardStatus);

  const { MAX_COL, MAX_ROW } = boardSettings;
  const [screenRef, { width }] = useElementSize();
  const height =
    MAX_ROW * (Math.floor(width / MAX_COL) - 1.5) + (MAX_ROW - 1) * 2;
  const setBoardWidth = useBoardSlice((state) => state.setBoardWidth);

  const supabase = useSupabaseClient();
  const { roomId } = useParams();
  const router = useRouter();

  useLayoutEffect(() => {
    setBoardWidth(width);
  }, [width, setBoardWidth]);

  useLayoutEffect(() => {
    if (roomDetails) {
      setRoom(roomDetails);
    }
  }, [roomDetails]);

  const roomChannel = supabase.channel(`room_${roomId}_update`);

  useEffect(() => {
    roomChannel
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
          filter: `id=eq.${roomId}`,
        },
        async () => {
          const { data: fetchedRoom, error } = await supabase
            .from("rooms")
            .select("*")
            .eq("id", roomId)
            .single();

          const {
            board: newBoardData,
            id: newRoomId,
            players: newRoomPlayers,
            current_player: currentPlayer,
            is_over: isOver,
          } = fetchedRoom as Database["public"]["Tables"]["rooms"]["Row"];

          const newRoom: RoomDetails = {
            roomId: newRoomId,
            players: newRoomPlayers,
            currentPlayer: currentPlayer,
            boardData: JSON.parse(newBoardData as string),
            isOver: isOver ? "over" : "continue",
          };

          setRoom(newRoom);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(roomChannel);
    };
  }, [supabase, roomChannel]);

  const boardStatus = useBoardSlice((state) => state.boardStatus);

  return (
    <div
      ref={screenRef}
      className={clsx(
        (isLoadingRoom ||
          isLoadingUser ||
          userId !== currentPlayer ||
          userId !== currentPlayerStore ||
          gameStatus === "over") &&
          "pointer-events-none",
        "flex flex-wrap justify-center items-center w-full relative"
      )}
    >
      {gameStatus === "over" && <MatchOverComp />}

      {isLoadingRoom || isLoadingUser || !board ? (
        <BoardLoading />
      ) : (
        <div className="flex flex-col gap-[2px]">
          {[...Array(MAX_ROW)].map((value, rowIndex) => {
            return (
              <div key={rowIndex} className="relative">
                <div
                  className={clsx(
                    "absolute inset-x-1 bg-secondary inset-y-[6px]"
                  )}
                  style={{
                    backgroundColor: border,
                  }}
                />
                <div className="flex gap-[2px]">
                  {[...Array(MAX_COL)].map((value, colIndex) => {
                    const variant =
                      rowIndex % 2 === 0 ? colIndex % 2 : (colIndex + 1) % 2;
                    return (
                      <div
                        key={board[colIndex + rowIndex * MAX_COL].id}
                        className="relative"
                      >
                        {rowIndex === 0 ? (
                          <div
                            className={clsx(
                              "absolute top-1 -z-10 inset-x-[6px]"
                            )}
                            style={{
                              backgroundColor: border,
                              height:
                                height -
                                0.5 *
                                  parseFloat(
                                    getComputedStyle(document.documentElement)
                                      .fontSize
                                  ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <BoardBox
                          col={board[colIndex + rowIndex * MAX_COL].col}
                          row={board[colIndex + rowIndex * MAX_COL].row}
                          id={colIndex + rowIndex * MAX_COL}
                          isBlank={board[colIndex + rowIndex * MAX_COL].isBlank}
                          player={board[colIndex + rowIndex * MAX_COL].player}
                          players={players!}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Board;
