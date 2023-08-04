"use client"

import { ThemeProps, themes } from "@/themes/theme";
import { useTheme as useMuiTheme } from "@material-tailwind/react";

export const useTheme = () => {
  const theme = useMuiTheme() as ThemeProps;
  if (theme) {
    return theme;
  } else {
    return themes[0];
  }
};
