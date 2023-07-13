import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { ThemeProps, themes } from "@/themes/theme";
import { ThemeConfig } from "tailwindcss/types/config";

interface ThemeSliceProps {
  theme: ThemeProps;
  themeSelect: (theme: ThemeProps) => void;
}

const theme = () => {
  const localTheme = JSON.parse(
    localStorage?.getItem("theme-storage") as string
  )?.state?.theme;

  return !localTheme ? themes[0] : localTheme;
};

export const useThemeSlice = create<ThemeSliceProps>()(
  devtools(
    persist(
      (set) => ({
        theme: theme(),
        themeSelect: (theme: ThemeProps) => set(() => ({ theme: theme })),
      }),
      {
        name: "theme-storage",
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
        // onRehydrateStorage: (state) => {
        //   state.theme = themes[1];
        //   // optional
        //   return (state, error) => {
        //     if (error) {
        //       console.log("an error happened during hydration", error);
        //     } else {
        //       console.log("hydration finished");
        //     }
        //   };
        // },
      }
    )
  )
);
