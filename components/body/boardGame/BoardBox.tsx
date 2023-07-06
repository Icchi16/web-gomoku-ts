"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

interface BoardBoxProps {
  width: number;
  height?: number;
  odd?: boolean;
  id: number;
}

const BoardBox: React.FC<BoardBoxProps> = ({ width, height, odd, id }) => {
  // const [boxWidth, setBoxWidth] = useState(width);

  // useEffect(() => {
  //   setBoxWidth(width);
  //   console.log(boxWidth);
  // }, [width]);

  return (
    <div
      className={clsx(odd && "bg-blue-gray-300", !odd && "bg-gray-300")}
      style={{ width: width , height: width }}
    >
      {id}
    </div>
  );
};

export default BoardBox;
