"use client";

import { CurrentRoomContextProvider } from "@/hooks/useRoom";

interface UserProviderProps {
  children: React.ReactNode;
}

const RoomProvider: React.FC<UserProviderProps> = ({ children }) => {
  return <CurrentRoomContextProvider>{children}</CurrentRoomContextProvider>;
};

export default RoomProvider;
