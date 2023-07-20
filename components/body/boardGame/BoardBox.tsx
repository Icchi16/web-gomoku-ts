"use client";

import { usePlayerSlice } from "@/store/playerSlice";
import { useTheme } from "@material-tailwind/react";
import { useCallback, useState } from "react";
import Mark from "./Mark";
import { useBoardSlice } from "@/store/boardSlice";
import { BoxValueProps } from "@/types/boardType";
import { type } from "os";

interface BoardBoxProps {
  boxData: BoxValueProps;
  col: number;
  row: number;
  width: number;
  height?: number;
  isVariant1?: boolean;
  id: number;
}

const BoardBox: React.FC<BoardBoxProps> = ({
  boxData,
  width,
  isVariant1,
  id,
  col,
  row,
}) => {
  const { boxVariant1, boxVariant2, markVariant1, markVariant2 } =
    useTheme().colors;
    
  const isPlayer1 = usePlayerSlice((state) => state.isPlayer1);
  const changePlayer = usePlayerSlice((state) => state.changePlayer);

  const boardUpdate = useBoardSlice((state) => state.boardUpdate);
  const latestRowUpdate = useBoardSlice((state) => state.latestRowUpdate);
  const latestColUpdate = useBoardSlice((state) => state.latestColUpdate);


  const handleClick = useCallback(
    (event: any) => {
      console.log(boxData);

      let { id, col, row } = event.currentTarget.attributes;
      id = +id.value;
      col = +col.value;
      row = +row.value;
      event.preventDefault();

      latestColUpdate(col);
      latestRowUpdate(row);
      boardUpdate(id, col, row, isPlayer1);
      changePlayer();
    },
    [boardUpdate, changePlayer, isPlayer1, latestColUpdate, latestRowUpdate]
  );

  return (
    <div
      style={{
        width: width,
        height: width,
        backgroundColor: isVariant1 ? boxVariant1 : boxVariant2,
        color: col % 2 === 0 ? markVariant1 : markVariant2,
      }}
    >
      <div
        id={id}
        col={col}
        row={row}
        onClick={boxData.isBlank ? handleClick : () => {}}
        className="h-full w-full flex items-center justify-center"
      >
        {boxData.isBlank ? (
          <div></div>
        ) : (
          <Mark isMarkX={boxData.player1} width={width} />
        )}
      </div>
    </div>
  );
};

export default BoardBox;
