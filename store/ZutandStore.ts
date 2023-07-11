import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { themes } from "@/themes/theme";
import localforage from "localforage";

interface ThemeSlice {
  theme: {};
  themeSelect: (theme: {}) => void;
}

const localTheme = JSON.parse(localStorage.getItem("theme-storage")).state
  .theme;

export const useZustandStore = create<ThemeSlice>()(
  devtools(
    persist(
      (set) => ({
        // theme: !localTheme ? themes[0] : localTheme,
        theme: !localTheme ? themes[0] : localTheme,
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
