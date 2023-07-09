"use client";

import clsx from "clsx";
import { LegacyRef, Ref } from "react";

interface ThemeBallProps {
  theme?: any;
  isModalOpen: boolean;
  onClick?: () => void;
  ref?: LegacyRef<HTMLDivElement>;
}

const ThemeBall: React.FC<ThemeBallProps> = ({
  theme,
  onClick,
  ref,
  isModalOpen,
}) => {
  const { markVariant1, markVariant2, boxVariant1, boxVariant2 } = theme.colors;
  return (
    <div
      className={clsx(
        "text-gray-900 w-20 h-20 rounded-full overflow-hidden flex relative",
        !isModalOpen && "pointer-events-none"
      )}
      ref={ref}
    >
      <div
        className="w-full flex-1"
        style={{ backgroundColor: boxVariant1 }}
      ></div>
      <div
        className="w-full flex-1"
        style={{ backgroundColor: boxVariant2 }}
      ></div>
      <div className="absolute inset-0 flex  justify-center items-center">
        <div className="w-3/5 h-3/5 rounded-full flex flex-col overflow-hidden">
          <div
            className="flex-1"
            style={{ backgroundColor: markVariant1 }}
          ></div>
          <div
            className="flex-1"
            style={{ backgroundColor: markVariant2 }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ThemeBall;
