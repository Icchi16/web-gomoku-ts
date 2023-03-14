import { useState, useEffect } from "react";
import styles from "./Square.module.css";

interface Props {
  width: number;
  id: number;
  player1: boolean;
  value: any;
}

const Square = ({ width, id, player1, value }: Props) => {
  // State

  const [player1Box, setPlayer1Box] = useState<boolean>(player1);
  const [valueBox, setValueBox] = useState<any>(null);

  // handle event
  const handleClick = (e: Event) => {
    if (e.target.innerText === "") {
      console.log("no text");
      if (player1) {
        setValueBox("X");
      } else {
        setValueBox("O");
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
