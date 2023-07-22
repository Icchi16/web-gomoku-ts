import { useBoardSlice } from "@/store/boardSlice";
import { toString, update } from "ramda";
import {
  MouseEventHandler,
  ReactEventHandler,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import boardSettings from "./boardSettings";
import { BoxValueProps } from "@/types/boardType";
import { useTheme } from "@material-tailwind/react";
import Mark from "./Mark";
import { gomokuCal } from "@/services/boardRule";
import { shallow } from "zustand/shallow";
import { current } from "immer";

type BoxVariant = {
  variant: number;
};

const BoardBox: React.FC<BoxValueProps & BoxVariant> = memo(function BoardBox({
  id,
  col,
  row,
  player,
  variant,
  isBlank,
}) {
  const { boxVariant1, boxVariant2 } = useTheme().colors;

  const boardWidth = useBoardSlice((state) => state.boardWidth);
  const { MAX_COL } = boardSettings;
  const width = Math.floor(boardWidth / MAX_COL);

  const updateBox = useBoardSlice((state) => state.updateBox);
  const gomokuCal = useBoardSlice((state) => state.gomokuCal);


  const handleClick = useCallback(
    (id: number) => {
      if (isBlank) {
        updateBox(id);
        gomokuCal(id);
      }
    },
    [updateBox, gomokuCal, isBlank]
  );

  useLayoutEffect(() => {}, []);

  return (
    <div
      style={{
        width: width,
        height: width,
        backgroundColor: variant === 1 ? boxVariant1 : boxVariant2,
      }}
      onClick={() => {
        handleClick(id);
      }}
    >
      {isBlank ? (
        <div></div>
      ) : (
        <Mark isMarkX={player === 1 ? true : false} width={width} />
      )}
    </div>
  );
});

export default BoardBox;
