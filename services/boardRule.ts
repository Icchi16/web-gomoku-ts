import { BoxValueProps } from "@/types/boardType";
import {
  __,
  apply,
  count,
  equals,
  filter,
  gt,
  gte,
  is,
  lte,
  map,
  max,
  propEq,
  propSatisfies,
  when,
  where,
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
  const XRange: RangeProps = {
    max: +latestCol + 5,
    min: +latestCol - 5,
  };

  // get horizontal Array
  const XArrayCondition = (boxValue) => {
    return (
      boxValue.value?.row === latestRow &&
      boxValue.value?.col > +latestCol - 5 &&
      boxValue.value?.col < +latestCol + 5
    );
  };

  const xArray = board
    .filter((value, index) => {
      return (
        index % MAX_COL > +latestCol - 5 &&
        index % MAX_COL < +latestCol + 5 &&
        Math.floor(index / MAX_COL) === +latestRow
      );
    })
    .map((value) => {
      return value.player1 === isPlayer1 ? value : {};
    });

  let counter = [1];
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
