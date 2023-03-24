import { Col, Row } from "@nextui-org/react";
import styles from "./ScoreBoard.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const ScoreBoard = () => {
  // State
  const player = useSelector((state: RootState) => state.player.player1);

  return (
    <div>
      <div>This is Score Board</div>{" "}
      <div>It is {player ? "player 1" : "player 2"}'s turn</div>
    </div>
  );
};

export default ScoreBoard;
