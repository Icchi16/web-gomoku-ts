"use client";

import { useBoardSlice } from "@/store/boardSlice";
import BoardBox from "./BoardBox";
import boardSettings from "./boardSettings";
import { useElementSize } from "usehooks-ts";
import { useLayoutEffect, useEffect, useTransition, useState } from "react";
import { ThemeProps } from "@/themes/theme";
import clsx from "clsx";
import { useTheme } from "@/hooks/useTheme";
import { BoardData, RoomData } from "../../../app/[roomId]/page";
import BoardLoading from "./BoardLoading";
import { useUser } from "@/hooks/useUser";

interface BoardProps {
  boardData: BoardData;
  roomData: RoomData;
}

const BoardGame: React.FC<BoardProps> = ({ boardData, roomData }) => {
  const { currentPlayer, players } = roomData;
  const userId = useUser().userDetails?.id;

  const { border } = useTheme().colors as ThemeProps["colors"];
  const board = useBoardSlice((state) => state.board)?.boxData;
  const currentPlayerStore = useBoardSlice(
    (state) => state.room?.currentPlayer
  );

  const setBoard = useBoardSlice((state) => state.setBoard);
  const setRoom = useBoardSlice((state) => state.setRoom);

  const { MAX_COL, MAX_ROW } = boardSettings;
  const [screenRef, { width }] = useElementSize();
  const height =
    MAX_ROW * (Math.floor(width / MAX_COL) - 1.5) + (MAX_ROW - 1) * 2;
  const setBoardWidth = useBoardSlice((state) => state.setBoardWidth);

  useLayoutEffect(() => {
    setBoardWidth(width);
  }, [width, setBoardWidth]);

  useLayoutEffect(() => {
    setBoard(boardData);
    setRoom(roomData);
  }, []);

  console.log(currentPlayerStore);
  return (
    <div
      ref={screenRef}
      className={clsx(
        (!board || userId !== currentPlayer || userId !== currentPlayerStore) &&
          "pointer-events-none",
        "flex flex-wrap justify-center items-center w-full"
      )}
    >
      {!board ? (
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

export default BoardGame;
