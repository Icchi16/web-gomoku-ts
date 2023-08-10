"use client";

import { useModalSlice } from "@/store/modalSlice";
import EmptyState from "../EmptyState";
import CreateRoomModal from "./CreateRoomModal";

const Modal = () => {
  const roomModalState = useModalSlice((state) => state.roomModalState);

  return (
    <div className="flex justify-center items-center h-full">
      {!roomModalState ? <CreateRoomModal /> : <EmptyState />}
    </div>
  );
};

export default Modal;
