"use client";

import { useTheme } from "@/hooks/useTheme";
import { ThemeProps } from "@/themes/theme";
import { ReactNode } from "react";

interface MainBodyProps {
  children: ReactNode;
}

const MainBody: React.FC<MainBodyProps> = ({ children }) => {
  const { bgColor1 } = useTheme().colors as ThemeProps["colors"];

  return (
    <div className="h-full" style={{ backgroundColor: bgColor1 }}>
      <div className="fixed inset-0 left-80">{children}</div>
    </div>
  );
};

export default MainBody;
