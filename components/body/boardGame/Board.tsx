import { useBoardSlice } from "@/store/boardSlice";
import BoardBox from "./BoardBox";
import boardSettings from "./boardSettings";
import { useElementSize } from "usehooks-ts";
import { useLayoutEffect } from "react";
import { ThemeProps } from "@/themes/theme";
import clsx from "clsx";
import { useTheme } from "@material-tailwind/react";

const BoardGame = () => {
  const { border } = useTheme().colors as ThemeProps["colors"];
  const board = useBoardSlice((state) => state.board);
  const boardStatus = useBoardSlice((state) => state.boardStatus);

  const { MAX_COL, MAX_ROW } = boardSettings;
  const [screenRef, { width }] = useElementSize();
  const height =
    MAX_ROW * (Math.floor(width / MAX_COL) - 1.5) + (MAX_ROW - 1) * 2;
  const setBoardWidth = useBoardSlice((state) => state.setBoardWidth);

  useLayoutEffect(() => {
    setBoardWidth(width);
  }, [width, setBoardWidth]);

  return (
    <div
      ref={screenRef}
      className={"flex flex-wrap justify-center items-center w-full"}
    >
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
                          className={clsx("absolute top-1 -z-10 inset-x-[6px]")}
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
    </div>
  );
};

export default BoardGame;
