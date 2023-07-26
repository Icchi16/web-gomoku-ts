import { useBoardSlice } from "@/store/boardSlice";
import { memo, useCallback, useLayoutEffect } from "react";
import boardSettings from "./boardSettings";
import { BoxValueProps } from "@/types/boardType";
import { useTheme } from "@material-tailwind/react/context/theme";
import Mark from "./Mark";

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
  console.log("rendered");

  const { boxVariant1, boxVariant2, bgColor1 } = useTheme().colors;

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

  useLayoutEffect(() => {}, []);

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
