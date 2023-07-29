"use client";

import { useThemeSlice } from "@/store/themeSlice";
import { ThemeProvider } from "@material-tailwind/react";
import { useEffect, useLayoutEffect } from "react";
import { themes } from "./theme";
interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProviderClient: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useThemeSlice((state) => state.theme);
  const themeSelect = useThemeSlice((state) => state.themeSelect);

  useLayoutEffect(() => {
    if (!theme) {
      themeSelect(themes[0]);
    }
  }, []);

  return <ThemeProvider value={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderClient;
