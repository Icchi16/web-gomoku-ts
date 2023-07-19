import { BoxValueProps } from "@/types/boardType";
import {
  apply,
  reverse,

} from "ramda";
import { useBoardSlice } from "../store/boardSlice";
import { useStore } from "zustand";
import { ThemeProps } from "@/themes/theme";
import { value } from "@material-tailwind/react/types/components/chip";
import boardSettings from "@/components/body/boardGame/boardSettings";
interface GomokuType {
  id: number;
  row: number;
  col: number;
}

interface RangeProps {
  max: number;
  min: number;
}

const { MAX_ROW, MAX_COL } = boardSettings;

export const gomokuCal = (
  board: BoxValueProps[],
  latestCol: number,
  latestRow: number,
  isPlayer1: boolean
) => {
  // get Array length of 9 in 4 directions

  const xArray = board
    .filter((value, index) => {
      const boxCol = index % MAX_COL;
      const boxRow = Math.floor(index / MAX_COL);

      return (
        boxCol > +latestCol - 5 &&
        boxCol < +latestCol + 5 &&
        boxRow === +latestRow
      );
    })
    .map((value) => {
      return value.player1 === isPlayer1 ? value : {};
    });

  const yArray = board
    .filter((value, index) => {
      const boxCol = index % MAX_COL;
      const boxRow = Math.floor(index / MAX_COL);

      return (
        boxCol === +latestCol &&
        boxRow > +latestRow - 5 &&
        boxRow < +latestRow + 5
      );
    })
    .map((value) => {
      return value.player1 === isPlayer1 ? value : {};
    });

  const diagArrayUL2BR = board
    .filter((value, index) => {
      const boxCol = index % MAX_COL;
      const boxRow = Math.floor(index / MAX_COL);
      const boxDiff = Math.abs(boxCol - boxRow);
      const LatestDiff = Math.abs(+latestCol - +latestRow);

      return boxDiff === LatestDiff && Math.abs(boxCol - latestCol) < 5;
    })
    .map((value) => {
      return value.player1 === isPlayer1 ? value : {};
    });

  const diagArrayBL2UR = reverse(
    board
      .filter((value, index) => {
        const boxCol = index % MAX_COL;
        const boxRow = Math.floor(index / MAX_COL);
        const boxSum = Math.abs(boxCol + boxRow);
        const LatestSum = Math.abs(+latestCol + +latestRow);

        return boxSum === LatestSum && Math.abs(boxCol - latestCol) < 5;
      })
      .map((value) => {
        return value.player1 === isPlayer1 ? value : {};
      })
  );

  let counter: number[] = [1];
  if (xArray[0]) {
    xArray.reduce((prevValue, curValue) => {
      if (prevValue.player1 === curValue.player1) {
        counter[0]++;
        return curValue;
      } else {
        counter.push(counter[0]);
        counter[0] = 1;
        return curValue;
      }
    });
  }

  if (apply(Math.max, counter) >= 5) {
    console.log("we have a winner!");
  }

  // try using reduce and counter = 1
  console.log(xArray, counter);
};
