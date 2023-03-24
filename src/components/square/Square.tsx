import { useState, useEffect } from "react";
import styles from "./Square.module.css";
import OMark from "./mark/OMark";
import XMark from "./mark/XMark";

interface Props {
  width: number;
  id: number;
  player1: boolean;
  value: any;
}

const Square = ({ width, id, player1, value }: Props) => {
  // State

  const [valueBox, setValueBox] = useState<any>(null);

  // handle event
  const handleClick = (e: Event) => {
    if (e.target.innerText === "") {
      console.log("no text");
      if (player1) {
        setValueBox(<XMark width={width} />);
      } else {
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
