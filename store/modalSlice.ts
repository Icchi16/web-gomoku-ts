import { create } from "zustand";

interface ModalSliceProps {
  roomModalState: boolean;
  changeRoomModalState: () => void;
  profileModalState: boolean;
  changeProfileModalState: () => void;
}

export const useModalSlice = create<ModalSliceProps>((set) => ({
  roomModalState: false,
  changeRoomModalState: () =>
    set((state) => ({ roomModalState: !state.roomModalState })),

  profileModalState: false,
  changeProfileModalState: () =>
    set((state) => ({ profileModalState: !state.profileModalState })),
}));
