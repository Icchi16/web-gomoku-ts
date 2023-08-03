"use client";

import { CurrentUserContextProvider } from "@/hooks/useUser";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return <CurrentUserContextProvider>{children}</CurrentUserContextProvider>;
};

export default UserProvider;
