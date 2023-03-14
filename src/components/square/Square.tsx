import { useState, useEffect } from "react";
import styles from "./Square.module.css";

const Square = ({ width, id }) => {
  // State

  let player1: boolean = true;
  const [value, setValue] = useState<any>(null);

  // handle event
  const handleClick = (e: Event) => {
    if (player1) {
      player1 = player1!;
      console.log(player1);
      setValue("x");
    } else {
      setValue("O");
      player1 = player1!;
    }
  };

  return (
    <div
      id={id}
      className={styles.Square}
      style={{ width: `${width}px`, height: `${width}px` }}
      onClick={handleClick}
    >
      {value}
    </div>
  );
};

export default Square;
