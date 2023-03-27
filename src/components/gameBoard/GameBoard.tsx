import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./GameBoard.module.css";
import { Col, Row, Container } from "@nextui-org/react";
import Square from "../square/Square";
import ScoreBoard from "../scoreBoard/ScoreBoard";
import {
  BOX_PER_ROW,
  BOX_ROW,
  boardWidthValue,
  boxWidthValue,
  resizeBoard,
} from "../../slices/board/board";
import { useSelector, useDispatch } from "react-redux";

const GameBoard = () => {
  let value: any = null;
  const boardRef: RefObject<any> = useRef();

  // State
  const boxWidth = useSelector(boxWidthValue);
  const boardWidth = useSelector(boardWidthValue);
  const BOX_PER_ROW_VALUE = useSelector(BOX_PER_ROW);
  const BOX_ROW_VALUE = useSelector(BOX_ROW);

  // Event handling
  const dispatch = useDispatch();

  const getBoxWidth = () => {
    dispatch(resizeBoard(boardRef.current.offsetWidth));
    console.log(boxWidth, boardWidth);
  };

  useLayoutEffect(() => {
    getBoxWidth();
    window.addEventListener("resize", getBoxWidth);
    return () => {
      window.removeEventListener("resize", getBoxWidth);
    };
  }, [boardWidth]);

  return (
    <Container gap={0}>
      <Row gap={0}>
        <Col span={12}>
          <ScoreBoard />
        </Col>
      </Row>
      <Row gap={0} justify="center">
        <Col span={11}>
          <div ref={boardRef} className={styles.GameBoard}>
            <Row wrap="wrap" justify="center">
              {[...Array(BOX_PER_ROW_VALUE * BOX_ROW_VALUE)].map(
                (x, i: number) => (
                  <Square id={i} key={i} value={i} />
                )
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GameBoard;
