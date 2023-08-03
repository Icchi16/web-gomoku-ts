"use client";

import { useBoardSlice } from "@/store/boardSlice";
import { memo, useCallback, useLayoutEffect } from "react";
import boardSettings from "./boardSettings";
import { BoxValueProps } from "@/types/types";
import Mark from "./Mark";
import { useTheme } from "@/hooks/useTheme";

type BoxVariant = {
  variant: number;
};

const BoardBox: React.FC<BoxValueProps & BoxVariant> = memo(function BoardBox({
  id,
  player,
  isBlank,
}) {
  const {  bgColor1 } = useTheme().colors;

  const boardWidth = useBoardSlice((state) => state.boardWidth);
  const { MAX_COL } = boardSettings;
  const width = Math.floor(boardWidth / MAX_COL) - 1.5;

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

  return (
    <div
      style={{
        width: width,
        height: width,
        backgroundColor: bgColor1,
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
