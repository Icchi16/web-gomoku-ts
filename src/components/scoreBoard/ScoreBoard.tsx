import { Col, Container, Row, Text } from "@nextui-org/react";
import styles from "./ScoreBoard.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const ScoreBoard = () => {
  // State
  const player = useSelector((state: RootState) => state.player.player1);

  return (
    <Container className={styles.ScoreBoardContainer}>
      <Row justify="center">
        <Col span={12}>
          <Text h1>It is {player ? "player 1" : "player 2"} turn</Text>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={6}>
          <Text h2>Player 1 : 0</Text>
        </Col>
        <Col span={6}>
          <Text h2>Player 2 : 0</Text>
        </Col>
      </Row>
    </Container>
  );
};

export default ScoreBoard;
