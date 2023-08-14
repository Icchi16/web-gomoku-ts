"use client";

import { createContext, useContext, useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { RoomDetails } from "../types/types";
import { useUser } from "./useUser";
import { useParams } from "next/navigation";
import { error } from "console";
import getUserNameById from "@/actions/getUserNameById";
import { filter } from "ramda";

type RoomContextType = {
  isLoading: boolean;
  roomDetails: RoomDetails | null;
};

export const RoomContext = createContext<RoomContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const CurrentRoomContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const { userDetails } = useUser();
  const { roomId } = useParams();

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null);

  const getRoomDetails = () =>
    supabase.from("rooms").select("*").eq("id", roomId).single();

  useEffect(() => {
    try {
      if (userDetails && !isLoadingData && !roomDetails && roomId) {
        setIsLoadingData(true);

        Promise.allSettled([getRoomDetails()]).then((results) => {
          const roomDetailsPromise = results[0];

          if (roomDetailsPromise.status === "fulfilled") {
            const fetchedData = roomDetailsPromise.value.data;

            const { players } = fetchedData;
            const guestId = filter(
              (playerId) => playerId !== userDetails.id,
              players
            )[0];

            Promise.allSettled([getUserNameById(guestId)]).then((results) => {
              const getGuestNamePromise = results[0];

              if (getGuestNamePromise.status === "fulfilled") {
                const guestName = getGuestNamePromise.value;
                const playerName = /["']/g.test(userDetails.username[0])
                  ? userDetails.username.substring(
                      1,
                      userDetails.username.length - 1
                    )
                  : userDetails.username;

                const roomDetails: RoomDetails = {
                  roomId: fetchedData.id,
                  currentPlayer: fetchedData.current_player,
                  players: fetchedData.players,
                  boardData: JSON.parse(fetchedData.board as string),
                  isOver: fetchedData.is_over ? "over" : "continue",
                  playerName: playerName,
                  guestName: guestName!,
                };

                setRoomDetails(roomDetails);
              } else {
                throw new Error("Something went wrong");
              }

              setIsLoadingData(false);
            });
          } else if (!userDetails && !isLoadingData && !isLoadingUser) {
          }
          setRoomDetails(null);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [session, userDetails, isLoadingData, roomId]);

  const value = {
    isLoading: isLoadingData || isLoadingUser,
    roomDetails: roomDetails,
  };

  return <RoomContext.Provider value={value} {...props} />;
};

const useRoom = () => {
  const context = useContext(RoomContext);

  if (context === undefined) {
    throw new Error("useRoom must be used within RoomProvider");
  }

  return context;
};

export default useRoom;
