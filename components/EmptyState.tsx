"use client";

import { useTheme } from "@/hooks/useTheme";
import { useUser } from "@/hooks/useUser";
import { ThemeProps } from "@/themes/theme";

interface EmptyStateProps {}

const EmptyState: React.FC<EmptyStateProps> = () => {
  const { baseTextColor } = useTheme().colors as ThemeProps["colors"];
  const { userDetails } = useUser();

  return (
    <div className="flex justify-center items-center h-full p-8">
      <h3
        className="text-4xl font-bold tracking-wider"
        style={{ color: baseTextColor }}
      >
        {userDetails?.id ? "Select an option from main menu" : "Login or Register to start playing"}
      </h3>
    </div>
  );
};

export default EmptyState;
