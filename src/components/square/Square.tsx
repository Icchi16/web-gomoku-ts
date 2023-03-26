import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePlayer, playerValue } from "../../slices/player/playerSlices";

import styles from "./Square.module.css";
import OMark from "./mark/OMark";
import XMark from "./mark/XMark";
import { BOX_PER_ROW, boxWidthValue } from "../../slices/board/board";

interface Props {
  id: number;
  value: any;
}

const Square = ({ id, value }: Props) => {
  // State
  const [valueBox, setValueBox] = useState<any>(null);
  const player = useSelector(playerValue);
  const boxWidth = useSelector(boxWidthValue);
  const boxPerRow = useSelector(BOX_PER_ROW);

  // Dispatch
  const dispatch = useDispatch();

  // handle event
  const handleClick = (e: Event) => {
    const targetBox = e.currentTarget as HTMLElement;

    if (targetBox.childNodes.length === 0) {
      if (player) {
        dispatch(changePlayer());
        setValueBox(<XMark />);
      } else {
        dispatch(changePlayer());
        setValueBox(<OMark />);
      }
    } else console.log("some text");
  };

  return (
    <div
      id={id}
      style={{
        width: `${boxWidth}px`,
        height: `${boxWidth}px`,
        backgroundColor:
          (id % 2) - (Math.floor(id / boxPerRow) % 2)
            ? "DarkGray"
            : "GhostWhite",
      }}
      onClick={handleClick}
      value={value}
    >
      {valueBox}
    </div>
  );
};

export default Square;
