import { create } from "zustand";
import { themes } from "@/themes/theme";

interface StoreProps {
  theme: {};
  themeSelect: (theme: {}) => void;
}

export const useZustandStore = create<StoreProps>((set) => ({
  theme: themes[0],
  themeSelect: (theme: {}) => {
    set((state) => ({ theme: theme }));
  },
}));
