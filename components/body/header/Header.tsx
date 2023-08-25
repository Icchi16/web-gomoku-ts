"use client";

import useRoom from "@/hooks/useRoom";
import { useTheme } from "@/hooks/useTheme";
import { useUser } from "@/hooks/useUser";
import { useBoardSlice } from "@/store/boardSlice";
import { ThemeProps, opacity } from "@/themes/theme";
import { indexOf } from "ramda";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/supabase.types";
import { error } from "console";
import { Avatar } from "@material-tailwind/react";
import { placeholder } from "@/public/public";

const Header = () => {
  const { roomDetails } = useRoom();
  const currentPlayer = useBoardSlice((state) => state.room?.currentPlayer);
  const { userDetails } = useUser();
  const [playersAvatar, setPlayerAvatar] = useState<any>();
  const [playerIndex, setPlayerIndex] = useState<number>(0);
  const supabase = useSupabaseClient<Database>();

  const { bgColor2, markVariant1, markVariant2, primaryColor, baseTextColor } =
    useTheme().colors;
  const [markVariant, setMarkVariant] = useState<string | null>(primaryColor);

  useEffect(() => {
    if (roomDetails?.players && currentPlayer) {
      indexOf(currentPlayer, roomDetails.players) === 0
        ? setMarkVariant(markVariant1)
        : setMarkVariant(markVariant2);
    }
  }, [currentPlayer, roomDetails, userDetails]);

  useEffect(() => {
    const fetchAvatar = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("avatar")
        .in("id", roomDetails?.players!);

      return data;
    };

    if (roomDetails?.players) {
      fetchAvatar().then(
        (result) => {
          setPlayerAvatar(result);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [roomDetails]);

  useEffect(() => {
    if (roomDetails && playersAvatar) {
      const currentIndex = indexOf(currentPlayer, roomDetails.players!);
      setPlayerIndex(currentIndex);
    }
    console.log(currentPlayer);
  }, [currentPlayer]);

  return (
    <div
      className="flex justify-center items-center h-28 rounded-b-lg"
      style={{ backgroundColor: `${bgColor2}${opacity[30]}` }}
    >
      {roomDetails && currentPlayer && userDetails ? (
        <div
          className="font-bold text-4xl flex space-x-4 justify-center items-center"
          style={{ color: markVariant as string }}
        >
          {playersAvatar && (
            <Avatar
              size="xl"
              alt="avatar"
              src={
                playersAvatar[playerIndex].avatar
                  ? playersAvatar[playerIndex].avatar
                  : placeholder
              }
              withBorder
              variant="circular"
              className=" pointer-events-none border-[3px]"
              style={{ borderColor: baseTextColor }}
            />
          )}
          {currentPlayer === userDetails.id ? (
            <div>It&apos;s your turn</div>
          ) : (
            <div>
              Waiting for{" "}
              <span className="italic underline">{roomDetails.guestName}</span>{" "}
              ...
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
