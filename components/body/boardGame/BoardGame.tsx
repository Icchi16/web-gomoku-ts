"use client";

import BoardBox from "./BoardBox";
import boardSettings from "./boardSettings";
import { useElementSize } from "usehooks-ts";

const BoardGame = () => {
  const { MAX_BOX, MAX_COL } = boardSettings;
  const [boxRef, { width, height }] = useElementSize();

  console.log(width);

  return (
    <div
      ref={boxRef}
      className=" flex flex-wrap justify-center items-center rounded-lg overflow-hidden"
    >
      {[...Array(MAX_BOX)].map((value, index) => {
        return (
          <BoardBox
            key={index}
            width={width / MAX_COL}
            odd={index % 2 !== 0 ? true : false}
            id={index}
          />
        );
      })}
    </div>
  );
};

export default BoardGame;
