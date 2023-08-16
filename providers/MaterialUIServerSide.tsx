"use client";

import { useThemeSlice } from "@/store/themeSlice";
import { themes } from "@/themes/theme";
import { ThemeProvider } from "@material-tailwind/react";
interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProviderClient: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useThemeSlice((state) => state.theme);

  return (
    <ThemeProvider value={theme?.colors.baseTextColor ? theme : themes[0]}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderClient;
