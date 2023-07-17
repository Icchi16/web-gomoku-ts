"use client";

import { usePlayerSlice } from "@/store/playerSlice";
import { useTheme } from "@material-tailwind/react";
import { useState } from "react";
import Mark from "./Mark";
import { useBoardSlice } from "@/store/boardSlice";

interface BoardBoxProps {
  col: number;
  row: number;
  width: number;
  height?: number;
  isVariant1?: boolean;
  id: number;
}

const BoardBox: React.FC<BoardBoxProps> = ({
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

  const [boxState, setBoxState] = useState({ blank: true, disabled: false });
  const [XMark, setXMark] = useState(isPlayer1);

  const handleClick = (event: any) => {
    const { id, col, row } = event.currentTarget.attributes;
    event.preventDefault();

    setXMark(isPlayer1);
    setBoxState({ blank: false, disabled: true });
    boardUpdate(id.value, col.value, row.value, isPlayer1);
    changePlayer();
  };

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
        onClick={boxState.disabled ? () => {} : handleClick}
        className="h-full w-full flex items-center justify-center"
      >
        {boxState.blank ? (
          <div></div>
        ) : XMark ? (
          <Mark isMarkX width={width} />
        ) : (
          <Mark isMarkX={false} width={width} />
        )}
      </div>
    </div>
  );
};

export default BoardBox;
