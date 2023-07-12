"use client";

import { useTheme } from "@material-tailwind/react";
import clsx from "clsx";

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
  const theme = useTheme();
  const { boxVariant1, boxVariant2, markVariant1, markVariant2 } = theme.colors;

  return (
    <div
      style={{
        width: width,
        height: width,
        backgroundColor: isVariant1 ? boxVariant1 : boxVariant2,
        color: col % 2 === 0 ? markVariant1 : markVariant2,
      }}
    >
      {id}
    </div>
  );
};

export default BoardBox;
