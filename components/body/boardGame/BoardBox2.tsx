import { useBoardSlice } from "@/store/boardSlice";
import { toString, update } from "ramda";
import { MouseEventHandler, ReactEventHandler, memo } from "react";
import boardSettings from "./boardSettings";
import { BoxValueProps } from "@/types/boardType";
import { useTheme } from "@material-tailwind/react";

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
  console.log("box rendered");
  const { boxVariant1, boxVariant2 } = useTheme().colors;

  const { MAX_COL } = boardSettings;

  const updateCol = useBoardSlice((state) => state.updateCol);
  const boardWidth = useBoardSlice((state) => state.boardWidth);
  const width = Math.floor(boardWidth / MAX_COL);

  const handleClick = (id, col, row) => {
    updateCol(2, id);
  };

  return (
    <div
      style={{
        width: width,
        height: width,
        backgroundColor: variant === 1 ? boxVariant1 : boxVariant2,
      }}
      onClick={() => {
        handleClick(id, col, row);
      }}
    >
      {col}
    </div>
  );
});

export default BoardBox;
