import { create } from "zustand";

interface PlayerSliceProps {
  currentPlayer: "player1" | "player2";
  changePlayer: () => void;
}

export const usePlayerSlice = create<PlayerSliceProps>((set) => ({
  currentPlayer: "player1",
  changePlayer: () =>
    set((state) => ({
      currentPlayer: state.currentPlayer === "player1" ? "player2" : "player1",
    })),
}));
