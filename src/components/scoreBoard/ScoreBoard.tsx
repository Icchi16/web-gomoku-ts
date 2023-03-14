import { Col, Row } from "@nextui-org/react";
import styles from "./ScoreBoard.module.css";

const ScoreBoard = ({ player }) => {
  return (
    <div>
      <div>This is Score Board</div>{" "}
      <div>It is {player ? "player 1" : "player 2"}'s turn</div>
    </div>
  );
};

export default ScoreBoard;
