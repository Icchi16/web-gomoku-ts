"use client";

import { ThemeProps } from "@/themes/theme";
import { ToastOptions, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import getUserNameById from "@/actions/getUserNameById";
import { error } from "console";
import { NextResponse } from "next/server";
import { startTransition, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import Button from "../Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserDetails } from "../../types/types";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface ConfirmRoomToastProps {
  senderId: string | null;
}

export const requestToastProps = (
  theme: ThemeProps["colors"],
  senderId: string
) => {
  const toastProps: ToastOptions = {
    toastId: senderId,
    style: { backgroundColor: theme.primaryColor },
    autoClose: 50000,
    closeOnClick: false,
    draggable: false,
    closeButton: false,
  };
  return toastProps;
};

const ConfirmRoomToast: React.FC<ConfirmRoomToastProps> = ({ senderId }) => {
  const [senderName, setSenderName] = useState<string | null>(null);
  const { bgColor2 } = useTheme().colors;
  const router = useRouter();
  const { userDetails } = useUser();
  const supabase = useSupabaseClient();

  if (senderId) {
    Promise.resolve(getUserNameById(senderId)).then(
      (value) => {
        if (value) setSenderName(value);
      },
      (error) => {
        throw new NextResponse(error, { status: 400 });
      }
    );
  }

  const handleYes = async () => {
    const handlerData = [userDetails?.id, senderId];
    startTransition(() => {
      axios.post("/api/room", handlerData).then((response) => {
        const { data: newRoom } = response;

        console.log("clicked yes");

        const responseChannel = supabase.channel(`response:${senderId}`, {
          config: {
            broadcast: {
              ack: true,
            },
          },
        });

        responseChannel.subscribe(async (status) => {
          console.log(status);
          if (status === "SUBSCRIBED") {
            const response = await responseChannel.send({
              type: "broadcast",
              event: "getResponse",
              payload: {
                result: "accept",
                roomId: newRoom.id,
              },
            });

            console.log(response);
          }
        });

        router.push(`/${newRoom.id}`);
      });
    });
  };

  const handleNo = () => {
    toast.dismiss(senderId as string);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div style={{ color: bgColor2 }} className="text-lg">
        <p className="text-center">
          <span className="font-bold underline text-xl">{senderName}</span> want
          to challenge you?
        </p>
        <p className="text-center">Do you accept Kombat ?</p>
      </div>
      <div className="flex space-x-3">
        <div className="flex-1">
          <Button variant="filled" fullWidth onClick={handleYes}>
            Yes
          </Button>
        </div>
        <div className="flex-1">
          <Button variant="filled" fullWidth onClick={handleNo}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRoomToast;
