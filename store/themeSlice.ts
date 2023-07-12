import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { themes } from "@/themes/theme";

interface ThemeSlice {
  theme: {};
  themeSelect: (theme: {}) => void;
}

const theme = () => {
  const localTheme = JSON.parse(
    localStorage?.getItem("theme-storage") as string
  )?.state?.theme;

  return !localTheme ? themes[0] : localTheme;
};

export const useZustandStore = create<ThemeSlice>()(
  devtools(
    persist(
      (set) => ({
        theme: theme(),
        themeSelect: (theme: {}) => set(() => ({ theme: theme })),
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
