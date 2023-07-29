import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { ThemeProps, themes } from "@/themes/theme";
import theme from "@material-tailwind/react/theme";

interface ThemeSliceProps {
  theme: ThemeProps | null;
  themeSelect: (theme: ThemeProps) => void;
}

export const useThemeSlice = create<ThemeSliceProps>()(
  persist(
    (set) => ({
      theme: localStorage.getItem("theme-storage")
        ? JSON.parse(localStorage.getItem("theme-storage") as string)
        : themes[0],
      themeSelect: (theme: ThemeProps) => set(() => ({ theme: theme })),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
