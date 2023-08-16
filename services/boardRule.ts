import { BoxValueProps } from "@/types/types";
import { apply, find, findIndex, has, of, reverse } from "ramda";
import boardSettings from "@/components/body/boardGame/boardSettings";

const { MAX_ROW, MAX_COL } = boardSettings;

export const gomokuCal = (
  board: BoxValueProps[],
  latestCol: number,
  latestRow: number,
  isPlayer1: BoxValueProps["player"]
) => {
  // get Array length of 9 in 4 directions

  const xArray = board
    .filter((value, index) => {
      const boxCol = index % MAX_COL;
      const boxRow = Math.floor(index / MAX_COL);

      return (
        boxCol > latestCol - 5 && boxCol < latestCol + 5 && boxRow === latestRow
      );
    })
    .map((value) => {
      return value.player === isPlayer1 ? value : {};
    });

  const yArray = board
    .filter((value, index) => {
      const boxCol = index % MAX_COL;
      const boxRow = Math.floor(index / MAX_COL);

      return (
        boxCol === latestCol && boxRow > latestRow - 5 && boxRow < latestRow + 5
      );
    })
    .map((value) => {
      return value.player === isPlayer1 ? value : {};
    });

  const diagArrayUL2BR = board
    .filter((value, index) => {
      const boxCol = index % MAX_COL;
      const boxRow = Math.floor(index / MAX_COL);
      const boxDiff = boxCol - boxRow;
      const latestDiff = latestCol - latestRow;

      return Math.abs(boxCol - latestCol) < 5 && boxDiff === latestDiff;
    })
    .map((value) => {
      return value.player === isPlayer1 ? value : {};
    });

  const diagArrayBL2UR = reverse(
    board
      .filter((value, index) => {
        const boxCol = index % MAX_COL;
        const boxRow = Math.floor(index / MAX_COL);
        const boxSum = boxCol + boxRow;
        const LatestSum = latestCol + latestRow;

        return boxSum === LatestSum && Math.abs(boxCol - latestCol) < 5;
      })
      .map((value) => {
        return value.player === isPlayer1 ? value : {};
      })
  );

  type InnerArrayType = (BoxValueProps | {})[];
  type OuterArrayType = InnerArrayType[];

  const checkWinArrays: OuterArrayType = [
    xArray,
    yArray,
    diagArrayUL2BR,
    diagArrayBL2UR,
  ];

  const checkWin = (clickedArrays: OuterArrayType): boolean => {
    const clickedArray = clickedArrays.map((clickedArray: InnerArrayType) => {
      const counter: number[] = [1];

      clickedArray.reduce(
        (prevBox: BoxValueProps | {}, nextBox: BoxValueProps | {}) => {
          if ("player" in prevBox) {
            if ("player" in nextBox && prevBox.player === nextBox.player) {
              counter[0]++;
              return nextBox;
            } else {
              counter.push(counter[0]);
              counter[0] = 1;
              return nextBox;
            }
          }
          return nextBox;
        }
      );

      return Math.max(...counter) >= 5;
    });

    return clickedArray.some((value) => value);
  };

  return checkWin(checkWinArrays);
};
