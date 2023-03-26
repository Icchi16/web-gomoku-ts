import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePlayer, playerValue } from "../../slices/player/playerSlices";

import styles from "./Square.module.css";
import OMark from "./mark/OMark";
import XMark from "./mark/XMark";
import { boxWidthValue } from "../../slices/board/board";

interface Props {
  width: number;
  id: number;
  value: any;
}

const Square = ({ width, id, value }: Props) => {
  // State
  const [valueBox, setValueBox] = useState<any>(null);
  const player = useSelector(playerValue);
  const boxWidth = useSelector(boxWidthValue);

  // Dispatch
  const dispatch = useDispatch();

  // handle event
  const handleClick = (e: Event) => {
    if (e.currentTarget.childNodes.length === 0) {
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
      className={styles.Square}
      style={{ width: `${boxWidth}px`, height: `${boxWidth}px` }}
      onClick={handleClick}
      value={value}
    >
      {valueBox}
    </div>
  );
};

export default Square;
