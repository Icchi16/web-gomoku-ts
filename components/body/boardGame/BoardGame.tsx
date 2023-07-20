"use client";

import { useBoardSlice } from "@/store/boardSlice";
import BoardBox from "./BoardBox";
import boardSettings from "./boardSettings";
import { useElementSize } from "usehooks-ts";
import { use, useCallback, useEffect, useMemo } from "react";
import { gomokuCal } from "@/services/boardRule";
import { usePlayerSlice } from "@/store/playerSlice";
import { BoxValueProps } from "@/types/boardType";

interface BoardProps {
  board: BoxValueProps[];
}

const BoardGame: React.FC<BoardProps> = ({ board }) => {
  // const board = useBoardSlice((state) => state.board);
  const { MAX_COL, MAX_ROW } = boardSettings;
  const [screenRef, { width }] = useElementSize();
  const latestRow = useBoardSlice((state) => state.latestRow);
  const latestCol = useBoardSlice((state) => state.latestCol);
  const isPlayer1 = usePlayerSlice((state) => state.isPlayer1);

  useEffect(() => {
    gomokuCal(board, latestCol, latestRow, !isPlayer1);
  }, [board, latestCol, latestRow, isPlayer1]);

  // need to change render based on server data
  return (
    <div
      ref={screenRef}
      className="flex flex-wrap justify-center items-center w-full"
    >
      <div className="flex flex-col rounded-lg overflow-hidden">
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
