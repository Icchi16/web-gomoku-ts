"use client";

import useRoom from "@/hooks/useRoom";
import { useTheme } from "@/hooks/useTheme";
import { useUser } from "@/hooks/useUser";
import { useBoardSlice } from "@/store/boardSlice";
import { ThemeProps, opacity } from "@/themes/theme";
import { indexOf } from "ramda";
import { useEffect, useState } from "react";

const Header = () => {
  const { roomDetails } = useRoom();
  const currentPlayer = useBoardSlice((state) => state.room?.currentPlayer);
  const { userDetails } = useUser();

  const { bgColor2, markVariant1, markVariant2, primaryColor } =
    useTheme().colors;
  const [markVariant, setMarkVariant] = useState<string | null>(primaryColor);

  useEffect(() => {
    if (roomDetails?.players && currentPlayer) {
      indexOf(currentPlayer, roomDetails.players) === 0
        ? setMarkVariant(markVariant1)
        : setMarkVariant(markVariant2);
    }
  }, [currentPlayer, roomDetails, userDetails]);

  return (
    <div
      className="flex justify-center items-center h-28 rounded-b-lg"
      style={{ backgroundColor: `${bgColor2}${opacity[30]}` }}
    >
      {roomDetails && currentPlayer && userDetails ? (
        <div
          className="font-bold text-4xl"
          style={{ color: markVariant as string }}
        >
          {currentPlayer === userDetails.id ? (
            <div>It&apos;s your turn</div>
          ) : (
            <div>Waiting for {roomDetails.guestName}...</div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
