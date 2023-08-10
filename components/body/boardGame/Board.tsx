"use client";

import { useBoardSlice } from "@/store/boardSlice";
import BoardBox from "./BoardBox";
import boardSettings from "./boardSettings";
import { useElementSize } from "usehooks-ts";
import { useLayoutEffect, useEffect, useTransition } from "react";
import { ThemeProps } from "@/themes/theme";
import clsx from "clsx";
import { useTheme } from "@/hooks/useTheme";
import { indexOf } from "ramda";

interface BoardProps {
  boardData: {
    id: string;
    board_data: string;
  };
  players: string[];
  currentPlayer: string;
}

const BoardGame: React.FC<BoardProps> = ({
  boardData,
  players,
  currentPlayer,
}) => {
  const userPlayerIndex = indexOf(currentPlayer, players) + 1;
  const currentTurn = useBoardSlice((state) => state.currentPlayer);

  const initialBoard = JSON.parse(boardData?.board_data as string);
  const boardId = +boardData.id;
  const { border } = useTheme().colors as ThemeProps["colors"];
  const board = useBoardSlice((state) => state.board)?.boardData;
  const setInitialBoard = useBoardSlice((state) => state.setInitialBoard);

  const { MAX_COL, MAX_ROW } = boardSettings;
  const [screenRef, { width }] = useElementSize();
  const height =
    MAX_ROW * (Math.floor(width / MAX_COL) - 1.5) + (MAX_ROW - 1) * 2;
  const setBoardWidth = useBoardSlice((state) => state.setBoardWidth);

  useLayoutEffect(() => {
    setBoardWidth(width);
  }, [width, setBoardWidth]);

  useEffect(() => {
    setInitialBoard(initialBoard, boardId);
  }, []);

  return (
    <div
      ref={screenRef}
      className={clsx(
        currentTurn !== userPlayerIndex && "pointer-events-none",
        "flex flex-wrap justify-center items-center w-full"
      )}
    >
      {!board ? (
        <div>Creating Board...</div>
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
                          variant={variant}
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
