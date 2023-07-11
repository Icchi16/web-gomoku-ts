"use client";

import clsx from "clsx";
import { LegacyRef, Ref } from "react";

interface ThemeBallProps {
  id: string | undefined;
  theme?: any;
  isModalOpen: boolean;
  onClick?: (event: any) => void;
}

const ThemeBall: React.FC<ThemeBallProps> = ({
  id,
  theme,
  onClick,
  isModalOpen,
}) => {
  const { markVariant1, markVariant2, boxVariant1, boxVariant2 } = theme.colors;
  return (
    <div
      id={id}
      onClick={onClick}
      className={clsx(
        "text-gray-900 w-20 h-20 rounded-full overflow-hidden flex relative",
        !isModalOpen && "pointer-events-none"
      )}
    >
      <div
        className="w-full flex-1 pointer-events-none"
        style={{ backgroundColor: boxVariant1 }}
      ></div>
      <div
        className="w-full flex-1 pointer-events-none"
        style={{ backgroundColor: boxVariant2 }}
      ></div>
      <div className="absolute inset-0 flex pointer-events-none justify-center items-center">
        <div className="w-3/5 h-3/5 rounded-full flex flex-col overflow-hidden pointer-events-none">
          <div
            className="flex-1 pointer-events-none"
            style={{ backgroundColor: markVariant1 }}
          ></div>
          <div
            className="flex-1 pointer-events-none"
            style={{ backgroundColor: markVariant2 }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ThemeBall;
