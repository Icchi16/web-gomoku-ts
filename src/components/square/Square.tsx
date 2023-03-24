import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePlayer } from "../../slices/player/playerSlices";
import type { RootState } from "../../store/store";

import styles from "./Square.module.css";
import OMark from "./mark/OMark";
import XMark from "./mark/XMark";

interface Props {
  width: number;
  id: number;
  player1: boolean;
  value: any;
}

const Square = ({ width, id, value }: Props) => {
  // State
  const [valueBox, setValueBox] = useState<any>(null);
  const player = useSelector((state: RootState) => state.player.player1);

  // Dispatch
  const dispatch = useDispatch();

  // handle event
  const handleClick = (e: Event) => {
    if (e.target.innerText === "") {
      console.log("no text");
      if (player) {
        dispatch(changePlayer());
        setValueBox(<XMark width={width} />);
      } else {
        dispatch(changePlayer());
        setValueBox(<OMark width={width} />);
      }
    } else console.log("some text");
  };

  return (
    <div
      id={id}
      className={styles.Square}
      style={{ width: `${width}px`, height: `${width}px` }}
      onClick={handleClick}
    >
      {valueBox}
    </div>
  );
};

export default Square;
