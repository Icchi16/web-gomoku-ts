"use client"

import { useTheme } from "@/hooks/useTheme";
import { ThemeProps } from "@/themes/theme";

interface EmptyStateProps {}

const EmptyState: React.FC<EmptyStateProps> = () => {
  const { baseTextColor } = useTheme().colors as ThemeProps["colors"];

  return (
    <div className="flex justify-center items-center h-full p-8">
      <h3
        className="text-4xl font-bold tracking-wider"
        style={{ color: baseTextColor }}
      >
        Login or Register to start playing
      </h3>
    </div>
  );
};

export default EmptyState;
