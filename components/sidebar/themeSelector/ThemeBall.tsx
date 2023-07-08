"use client";

import clsx from "clsx";
import { LegacyRef, Ref } from "react";

interface ThemeBallProps {
  isModalOpen: boolean;
  onClick?: () => void;
  ref?: LegacyRef<HTMLDivElement>;
}

const ThemeBall: React.FC<ThemeBallProps> = ({ onClick, ref, isModalOpen }) => {
  return (
    <div
      className={clsx(
        "text-gray-900 w-20 h-20 rounded-full overflow-hidden flex relative",
        !isModalOpen && "pointer-events-none"
      )}
      ref={ref}
    >
      <div className="bg-blue-900 w-full flex-1"></div>
      <div className="bg-red-900 w-full flex-1"></div>
      <div className="absolute inset-0 flex  justify-center items-center">
        <div className="w-3/5 h-3/5 rounded-full flex flex-col overflow-hidden">
          <div className="flex-1 bg-amber-700 "></div>
          <div className="flex-1 bg-green-700 "></div>
        </div>
      </div>
    </div>
  );
};

export default ThemeBall;
