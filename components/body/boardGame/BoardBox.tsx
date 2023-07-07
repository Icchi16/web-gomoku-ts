"use client";

import clsx from "clsx";

interface BoardBoxProps {
  col: number;
  row: number;
  width: number;
  height?: number;
  isVariant1?: boolean;
  id: number;
}

const BoardBox: React.FC<BoardBoxProps> = ({ width, isVariant1, id, col, row }) => {
  
  return (
    <div
      className={clsx(isVariant1 && "bg-blue-gray-300", !isVariant1 && "bg-gray-300")}
      style={{ width: width, height: width }}
    >
      {id}
    </div>
  );
};

export default BoardBox;
