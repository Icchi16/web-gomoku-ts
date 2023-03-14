import type { NextPage } from "next";
import { Button } from "@nextui-org/react";
import ScoreBoard from "../components/scoreBoard/ScoreBoard";
import GameBoard from "../components/gameBoard/GameBoard";

const Home: NextPage = () => {
  return (
    <div>
      <GameBoard />
    </div>
  );
};

export default Home;
