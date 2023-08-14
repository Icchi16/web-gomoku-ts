"use client";

import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { UserDetails } from "@/types/types";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";
import ConfirmRoomToast, {
  requestToastProps,
} from "@/components/modals/ConfirmCreateRoomToast";
import { useTheme } from "./useTheme";
import { useRouter } from "next/navigation";

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

  const theme = useTheme().colors;
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const router = useRouter();

  const getUserDetails = () =>
    supabase.from("profiles").select("*").eq("id", user?.id).single();

  useEffect(() => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }, [session, user, isLoadingData]);

  const inviteChannel = supabase.channel(`invite:${userDetails?.id}`, {
    config: {
      broadcast: {
        ack: true,
      },
    },
  });

  const resChannel = supabase.channel(`response:${userDetails?.id}`, {
    config: {
      broadcast: {
        ack: true,
      },
    },
  });

  useEffect(() => {
    //for sending createRoom
    inviteChannel
      .on("broadcast", { event: "sendInvite" }, (payload) => {
        const senderId = payload?.payload?.senderId;
        toast(
          <ConfirmRoomToast senderId={senderId} />,
          requestToastProps(theme, userDetails!.id)
        );
      })
      .subscribe();

    // for receiving response

    resChannel
      .on("broadcast", { event: "getResponse" }, (payload) => {
        console.log(payload);

        const response = payload?.payload.result;
        const roomId = payload?.payload?.roomId;

        if (response === "accept" && roomId) {
          toast.success("Your opponent have accepted your challenge!", {
            autoClose: 4000,
          });
          setTimeout(() => {
            router.push(`/${roomId}`);
          }, 5000);
        } else if (response === "declined") {
          toast.error("You're too powerful! Your opponent had withdraw");
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(inviteChannel);
      supabase.removeChannel(resChannel);
    };
  }, [supabase, inviteChannel, resChannel]);

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
