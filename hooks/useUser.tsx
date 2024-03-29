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
import { NewAnimatePresenceProps } from "@material-tailwind/react/types/generic";
import { error } from "console";
import { Database } from "@/types/supabase.types";

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

  const userInviteChannel = supabase.channel(`invite:${userDetails?.id}`, {
    config: {
      broadcast: {
        ack: true,
      },
    },
  });

  const userResponseChannel = supabase.channel(`response:${userDetails?.id}`, {
    config: {
      broadcast: {
        ack: true,
      },
    },
  });

  const onlineChannel = supabase.channel("online");

  const updateStatus = async (event: "join" | "leave", userId: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ is_online: event === "join" })
      .eq("id", userId);

    if (error) {
      toast.error("Status update failed");
    }
  };

  useEffect(() => {
    if (user && session) {
      onlineChannel
        .on("presence", { event: "join" }, ({ event, newPresences }) => {
          const { user: userId } = newPresences[0];
          updateStatus(event, userId);
        })
        .on("presence", { event: "leave" }, ({ event, leftPresences }) => {
          const { user: userId } = leftPresences[0];
          updateStatus(event, userId);
        })

        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            await onlineChannel.track({
              user: user.id,
              online_at: new Date().toISOString(),
            });
          }
        });
    }

    return () => {
      supabase.removeChannel(onlineChannel);
    };
  }, [onlineChannel]);

  useEffect(() => {
    //for sending createRoom
    userInviteChannel
      .on("broadcast", { event: "sendInvite" }, (payload) => {
        const senderId = payload?.payload?.senderId;

        const modalOnClose = () => {
          const responseChannel = supabase.channel(`response:${senderId}`, {
            config: {
              broadcast: {
                ack: true,
              },
            },
          });
          responseChannel.subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
              await responseChannel.send({
                type: "broadcast",
                event: "getResponse",
                payload: {
                  result: "declined",
                },
              });
            }
          });
          toast.dismiss(senderId as string);
        };

        toast(
          <ConfirmRoomToast senderId={senderId} />,
          requestToastProps(theme, senderId, modalOnClose)
        );
      })
      .subscribe();

    return () => {
      supabase.removeChannel(userInviteChannel);
    };
  }, [userInviteChannel]);

  useEffect(() => {
    // for receiving response
    userResponseChannel
      .on("broadcast", { event: "getResponse" }, (payload) => {
        const response = payload?.payload.result;
        const roomId = payload?.payload?.roomId;
        if (response === "accepted" && roomId) {
          toast.success("Your opponent have accepted your challenge!", {
            autoClose: 4000,
          });
          setTimeout(() => {
            router.push(`/${roomId}`);
          }, 5000);
        } else if (response === "declined") {
          toast.error("You're too powerful! Your opponent had withdraw", {
            autoClose: 4000,
          });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(userResponseChannel);
    };
  }, [userResponseChannel]);

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
