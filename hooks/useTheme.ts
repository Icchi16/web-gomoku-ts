import { themes } from "@/themes/theme";
import { useTheme as useMuiTheme } from "@material-tailwind/react";

export const useTheme = () => {
  const theme = useMuiTheme();
  if (theme) {
    return theme;
  } else {
    return themes[0];
  }
};
