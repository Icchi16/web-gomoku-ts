import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./GameBoard.module.css";
import { Col, Row } from "@nextui-org/react";

const GameBoard = () => {
  const SQUARE_SIZE: number = 0;
  const SQUARE_ROW: number = 16;
  const SQUARE_LINE: number = 4;

  let boardWidth: number = 0;

  const boardRef: RefObject<any> = useRef();

  const getBoardWidth = () => {
    if (boardRef.current) {
      boardWidth = boardRef.current.offsetWidth;
    }
  };

  useLayoutEffect(() => {
    getBoardWidth();
    window.addEventListener("resize", getBoardWidth);
    return () => {
      window.removeEventListener("resize", getBoardWidth);
    };
  }, []);

  const handleClick = (e: Event) => {
    const box = e.target as HTMLInputElement;
    console.log(box.id, boardWidth, boardRef.current.offsetWidth);
  };

  return (
    <div ref={boardRef}>
      <Row wrap="wrap">
        {[...Array(SQUARE_ROW * SQUARE_LINE)].map((x, i: number) => (
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
