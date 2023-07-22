import { useBoardSlice } from "@/store/boardSlice";
import BoardBox from "./BoardBox";
import boardSettings from "./boardSettings";
import { useElementSize } from "usehooks-ts";
import { useEffect, useMemo } from "react";
import { gomokuCal } from "@/services/boardRule";
import { shallow } from "zustand/shallow";

const BoardGame = () => {
  const board = useBoardSlice((state) => state.board);
  const boardStatus = useBoardSlice((state) => state.boardStatus);

  const { MAX_COL, MAX_ROW } = boardSettings;
  const [screenRef, { width }] = useElementSize();
  const setBoardWidth = useBoardSlice((state) => state.setBoardWidth);

  console.log(boardStatus);

  useEffect(() => {
    setBoardWidth(width);
  }, [width, setBoardWidth, board]);

  return (
    <div
      ref={screenRef}
      className={"flex flex-wrap justify-center items-center w-full"}
    >
      <div className="flex flex-col rounded-lg overflow-hidden">
        {[...Array(MAX_ROW)].map((value, rowIndex) => (
          <div key={rowIndex} className="flex">
            {[...Array(MAX_COL)].map((value, colIndex) => {
              const variant =
                rowIndex % 2 === 0 ? colIndex % 2 : (colIndex + 1) % 2;
              return (
                <BoardBox
                  key={board[colIndex + rowIndex * MAX_COL].id}
                  col={board[colIndex + rowIndex * MAX_COL].col}
                  row={board[colIndex + rowIndex * MAX_COL].row}
                  id={colIndex + rowIndex * MAX_COL}
                  isBlank={board[colIndex + rowIndex * MAX_COL].isBlank}
                  player={board[colIndex + rowIndex * MAX_COL].player}
                  variant={variant}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardGame;
