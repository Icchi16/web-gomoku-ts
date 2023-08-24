"use client";

import { ThemeProps } from "@/themes/theme";
import { ToastOptions, toast } from "react-toastify";
import getUserNameById from "@/actions/getUserNameById";
import { NextResponse } from "next/server";
import { startTransition, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import Button from "../Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface ConfirmRoomToastProps {
  senderId: string | null;
}

export const requestToastProps = (
  theme: ThemeProps["colors"],
  senderId: string,
  onClose: () => void
) => {
  const toastProps: ToastOptions = {
    toastId: senderId,
    style: { backgroundColor: theme.baseTextColor },
    autoClose: 50000,
    closeOnClick: false,
    draggable: false,
    closeButton: false,
    pauseOnHover: true,
    onClose: onClose,
  };

  return toastProps;
};

const ConfirmRoomToast: React.FC<ConfirmRoomToastProps> = ({ senderId }) => {
  const [senderName, setSenderName] = useState<string | null>(null);
  const { primaryColor } = useTheme().colors;
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
  const responseChannel = supabase.channel(`response:${senderId}`, {
    config: {
      broadcast: {
        ack: true,
      },
    },
  });

  const handleYes = async () => {
    const handlerData = [userDetails?.id, senderId];
    startTransition(() => {
      axios.post("/api/room", handlerData).then((response) => {
        const { data: newRoom } = response;

        responseChannel.subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            await responseChannel.send({
              type: "broadcast",
              event: "getResponse",
              payload: {
                result: "accepted",
                roomId: newRoom.id,
              },
            });
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
      <div style={{ color: primaryColor }} className="text-lg">
        <p className="text-center">
          <span className="font-bold underline text-xl">{senderName}</span> want
          to challenge you?
        </p>
        <p className="text-center">Do you accept Kombat ?</p>
      </div>
      <div className="flex space-x-3">
        <div className="flex-1">
          <Button variant="filled" success fullWidth onClick={handleYes}>
            Yes
          </Button>
        </div>
        <div className="flex-1">
          <Button variant="filled" danger fullWidth onClick={handleNo}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRoomToast;
