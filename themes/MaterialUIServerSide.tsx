"use client";

import { useZustandStore } from "@/store/themeSlice";
import { ThemeProvider } from "@material-tailwind/react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProviderClient: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useZustandStore((state) => state.theme);

  return <ThemeProvider value={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderClient;
