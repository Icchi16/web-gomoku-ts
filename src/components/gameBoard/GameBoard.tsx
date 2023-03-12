import styles from "./GameBoard.module.css";
import { Col, Row } from "@nextui-org/react";

const GameBoard = () => {
  const SQUARE_SIZE: number = 0;
  const SQUARE_ROW: number = 16;
  const SQUARE_LINE: number = 4;

  const handleClick = (e: Event) => {
    const box = e.target as HTMLInputElement;
    console.log(box.id);
  };

  return (
    <div>
      <Row wrap="wrap">
        {[...Array(SQUARE_ROW * SQUARE_LINE)].map((x, i) => (
          <div
            className={styles.Square}
            key={i}
            id={i + 1}
            onClick={handleClick}
          ></div>
        ))}
      </Row>
    </div>
  );
};

export default GameBoard;
