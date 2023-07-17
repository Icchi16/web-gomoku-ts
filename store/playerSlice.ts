import { create } from "zustand";

interface PlayerSliceProps {
  isPlayer1: boolean;
  changePlayer: () => void;
}

export const usePlayerSlice = create<PlayerSliceProps>((set) => ({
  isPlayer1: true,
  changePlayer: () => set((state) => ({ isPlayer1: !state.isPlayer1 })),
}));
