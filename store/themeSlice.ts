import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { ThemeProps, themes } from "@/themes/theme";

interface ThemeSliceProps {
  theme: ThemeProps | null;
  themeSelect: (theme: ThemeProps) => void;
}

let theme: ThemeProps;
if (typeof window !== "undefined") {
  const storedTheme = window.localStorage.getItem("theme-storage");
  if (storedTheme) {
    theme = JSON.parse(storedTheme).theme;
  } else {
    theme = themes[0];
  }
}

export const useThemeSlice = create<ThemeSliceProps>()(
  persist(
    (set) => ({
      theme: theme,
      themeSelect: (theme: ThemeProps) => set(() => ({ theme: theme })),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
