"use client";

import { useBoardSlice } from "@/store/boardSlice";
import BoardBox from "./BoardBox";
import boardSettings from "./boardSettings";
import { useElementSize } from "usehooks-ts";
import { use, useCallback, useEffect, useMemo } from "react";
import { gomokuCal } from "@/services/boardRule";
import { usePlayerSlice } from "@/store/playerSlice";
import { BoxValueProps } from "@/types/boardType";
import clsx from "clsx";
import ModalComp from "@/components/ModalComp";
import { useTheme } from "@material-tailwind/react";

const BoardGame = () => {
  const board = useBoardSlice((state) => state.board);
  const { MAX_COL, MAX_ROW } = boardSettings;
  const [screenRef, { width }] = useElementSize();
  const latestRow = useBoardSlice((state) => state.latestRow);
  const latestCol = useBoardSlice((state) => state.latestCol);

  const currentPlayer = usePlayerSlice((state) => state.currentPlayer);
  const isPlayer1 = currentPlayer === "player1" ? true : false;

  const boardStatus = useBoardSlice((state) => state.boardStatus);
  const boardStatusUpdate = useBoardSlice((state) => state.boardStatusUpdate);

  const gameStatus = useMemo(() => {
    return gomokuCal(board, latestCol, latestRow, !isPlayer1);
  }, [board, latestCol, latestRow, isPlayer1]);

  useEffect(() => {
    gameStatus ? boardStatusUpdate() : () => {};
  }, [gameStatus, boardStatusUpdate, currentPlayer]);

  console.log(currentPlayer);
  // need to change render based on server data
  return (
    <div
      ref={screenRef}
      className={clsx(
        boardStatus === "over" && "pointer-events-none",
        "flex flex-wrap justify-center items-center w-full"
      )}
    >
      <div className="flex flex-col rounded-lg overflow-hidden relative">
        {/* decorate winning status here */}
        {boardStatus === "over" && (
          <>
            <div className=" absolute inset-0 flex justify-center items-center ">
              <div
                className="absolute inset-0 bg-opacity-20 bg-indigo-700 "
                // style={{ background: bgColor2 }}
              />
              <ModalComp>
                <div className="absolute inset-0 flex items-center justify-center ">
                  <div className="bg-white w-full h-36" />
                </div>
                <div className="relative z-50 text-2xl font-bold">
                  The Winner is {currentPlayer}
                </div>
              </ModalComp>
            </div>
          </>
        )}

        {[...Array(MAX_ROW)].map((valueRow, indexRow) => {
          return (
            <div key={indexRow} className="flex">
              {[...Array(MAX_COL)].map((valueCol, indexCol) => {
                const variant =
                  indexRow % 2 === 0
                    ? indexCol % 2 === 0
                      ? true
                      : false
                    : indexCol % 2 === 0
                    ? false
                    : true;
                return (
                  <BoardBox
                    boxData={board[indexCol + indexRow * MAX_COL]}
                    key={indexCol + indexRow * MAX_COL}
                    id={indexCol + indexRow * MAX_COL}
                    col={indexCol}
                    row={indexRow}
                    width={width / MAX_COL}
                    isVariant1={variant}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardGame;
