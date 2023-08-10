import { create } from "zustand";

interface ModalSliceProps {
  roomModalState: boolean;
  changeRoomModalState: () => void;
}

export const useModalSlice = create<ModalSliceProps>((set) => ({
  roomModalState: false,
  changeRoomModalState: () =>
    set((state) => ({ roomModalState: !state.roomModalState })),
}));
