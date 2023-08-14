"use client";

import { useUser } from "@/hooks/useUser";
import { UserDetails } from "../../../types/types";
import { useTheme } from "@/hooks/useTheme";
import { opacity } from "@/themes/theme";
import { useBoardSlice } from "@/store/boardSlice";
import getWinnerName from "@/actions/getUserNameById";
import { useState, useEffect } from "react";
import clsx from "clsx";
import useRoom from "@/hooks/useRoom";

const MatchOverComp = () => {
  const { userDetails } = useUser();
  const currentWinner = useBoardSlice((state) => state.room?.currentPlayer);
  const userName = useRoom().roomDetails?.playerName;
  const { bgColor2, primaryColor } = useTheme().colors;

  return (
    <div className="absolute w-screen h-40 text-white z-10 flex justify-center items-center ">
      <div>
        <div className="transition-all">
          <div className="fixed bg-black bg-opacity-10 inset-0 backdrop-blur-[3px] z-0"></div>
          <div
            className="absolute inset-0 blur-sm"
            style={{ backgroundColor: `${primaryColor}${opacity[80]}` }}
          ></div>
        </div>
        <div
          className="text-2xl font-bold blur-0 status-animation"
          style={{ color: bgColor2 }}
        >
          {userDetails?.id && currentWinner ? (
            userDetails?.id === currentWinner ? (
              <div>
                Congrats&nbsp;
                <span className="italic text-3xl uppercase">{userName}</span>
                &nbsp;! You&apos;re the winner !
              </div>
            ) : (
              <div className="text-red-400">You&apos;re Deaded</div>
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchOverComp;
