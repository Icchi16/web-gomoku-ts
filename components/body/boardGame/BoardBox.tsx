"use client";

import { useMarkSlice } from "@/store/markSlice";
import { useTheme } from "@material-tailwind/react";
import clsx from "clsx";
import { useState } from "react";
import Mark from "./Mark";

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
  const { isMarkX, changeMark } = useMarkSlice((state) => state);
  const [boxState, setBoxState] = useState({ blank: true, disabled: false });
  const [XMark, setXMark] = useState(isMarkX);
  const handleClick = () => {
    setXMark(isMarkX);
    setBoxState({ blank: false, disabled: true });
    changeMark();
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
