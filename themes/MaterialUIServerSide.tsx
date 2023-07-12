"use client";

interface ThemeProviderProps {
  children: React.ReactNode;
}

import { useZustandStore } from "@/store/ZutandStore";
import { ThemeProvider } from "@material-tailwind/react";

const ThemeProviderClient: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useZustandStore((state) => state.theme);

  return <ThemeProvider value={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderClient;
