import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

import { Database } from "@/types/supabase.types";
import { UserDetails } from "@/types/types";
import { values } from "ramda";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const CurrentUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const getUserDetails = () => supabase.from("profiles").select("*").single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails()]).then((results) => {
        const userDetailsPromise = results[0];

        if (userDetailsPromise.status === "fulfilled") {
          setUserDetails(userDetailsPromise.value.data as UserDetails);
        }

        setIsLoadingData(false);
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingData]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingData || isLoadingUser,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
};
