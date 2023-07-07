"use client";

import BoardBox from "./BoardBox";
import boardSettings from "./boardSettings";
import { useElementSize } from "usehooks-ts";

const BoardGame = () => {
  const { MAX_BOX, MAX_COL, MAX_ROW } = boardSettings;
  const [screenRef, { width }] = useElementSize();

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
