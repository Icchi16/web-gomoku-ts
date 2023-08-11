"use client";

import { useTheme } from "@/hooks/useTheme";

const BoardLoading = () => {
  const { baseTextColor } = useTheme().colors;

  return (
    <h3
      className="text-4xl font-bold tracking-wider"
      style={{ color: baseTextColor }}
    >
      Creating Board ...
    </h3>
  );
};

export default BoardLoading;
