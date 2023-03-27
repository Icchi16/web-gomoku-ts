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
          <Text h1 className={styles.BoardText}>
            It is {player ? "player 1" : "player 2"} turn
          </Text>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={6}>
          <Text
            h2
            className={`${styles.Player1} ${
              player ? styles.Active : styles.NonActive
            }`}
          >
            Player 1 : 0
          </Text>
        </Col>
        <Col span={6}>
          <Text
            h2
            className={`${styles.Player2}  ${
              player ? styles.NonActive : styles.Active
            }`}
          >
            Player 2 : 0
          </Text>
        </Col>
      </Row>
    </Container>
  );
};

export default ScoreBoard;
