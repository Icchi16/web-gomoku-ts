import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { ThemeProps, themes } from "@/themes/theme";

interface ThemeSliceProps {
  theme: ThemeProps;
  themeSelect: (theme: ThemeProps) => void;
}

let theme: ThemeProps;

if (window !== undefined) {
  console.log("Storage Loaded");

  const localTheme = JSON.parse(
    localStorage?.getItem("theme-storage") as string
  )?.state?.theme;

  theme = !localTheme ? themes[0] : localTheme;
} else {
  console.log("You are on Server");
  theme = themes[0];
}

export const useThemeSlice = create<ThemeSliceProps>()(
  devtools(
    persist(
      (set) => ({
        theme: theme,
        themeSelect: (theme: ThemeProps) => set(() => ({ theme: theme })),
      }),
      {
        name: "theme-storage",
        storage: createJSONStorage(() => localStorage),
        skipHydration: false,
      }
    )
  )
);
