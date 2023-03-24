import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./GameBoard.module.css";
import { Col, Row, Container } from "@nextui-org/react";
import Square from "../square/Square";
import ScoreBoard from "../scoreBoard/ScoreBoard";

import { Provider } from "react-redux";
import { store } from "../../store/store";

const GameBoard = () => {
  const SQUARE_ROW: number = 30;
  const SQUARE_LINE: number = 15;

  let boardWidth: number = 0;
  let value: any = "x";

  const boardRef: RefObject<any> = useRef();

  // State
  const [boxWidth, setBoxWidth] = useState<number>(0);

  // Event handling
  const getBoardWidth = () => {
    if (boardRef.current) {
      boardWidth = boardRef.current.offsetWidth;
      setBoxWidth((boardWidth - SQUARE_ROW - 1) / SQUARE_ROW);
    }
  };

 
  useLayoutEffect(() => {
    getBoardWidth();
    window.addEventListener("resize", getBoardWidth);
    return () => {
      window.removeEventListener("resize", getBoardWidth);
    };
  }, [boxWidth]);

  return (
    <Container gap={0}>
      <Row gap={0}>
        <Col span={12}>
          <ScoreBoard />
        </Col>
      </Row>
      <Row gap={0} justify="center">
        <Col span={11}>
          <div ref={boardRef}>
            <Row wrap="wrap">
              {[...Array(SQUARE_ROW * SQUARE_LINE)].map((x, i: number) => (
                <Square
                  id={i + 1}
                  width={boxWidth}
                  key={i}
                  value={value}
                />
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GameBoard;
