import { create } from "zustand";

interface MarkSliceProps {
  isMarkX: boolean;
  changeMark: () => void;
}

export const useMarkSlice = create<MarkSliceProps>((set) => ({
  isMarkX: true,
  changeMark: () => set((state) => ({ isMarkX: !state.isMarkX })),
}));
