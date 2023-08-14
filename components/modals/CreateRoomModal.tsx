"use client";

import { useTheme } from "@/hooks/useTheme";
import Input from "../Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { NextResponse } from "next/server";
import { toast } from "react-toastify";
import { requestToastProps } from "./ConfirmCreateRoomToast";
import ConfirmRoomToast from "./ConfirmCreateRoomToast";
import { useUser } from "@/hooks/useUser";

const CreateRoomModal = () => {
  const { baseTextColor, bgColor2 } = useTheme().colors;
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useSupabaseClient();
  const { userDetails } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      guestName: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const guestName = data.guestName;
    const { data: guestId, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", guestName)
      .single();

    if (error) {
      console.log("can't find user");
      throw new NextResponse("can't find user", { status: 400 });
    } else {
      console.log(guestId.id);

      const channel = supabase.channel(`invite:${guestId.id}`, {
        config: {
          broadcast: {
            ack: true,
          },
        },
      });

      channel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.send({
            type: "broadcast",
            event: "sendInvite",
            payload: {
              senderId: userDetails?.id,
            },
          });
        }
      });
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center w-fit p-8 rounded-2xl"
      style={{ backgroundColor: bgColor2 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3
        className="text-4xl font-bold tracking-wider"
        style={{ color: baseTextColor }}
      >
        CHALLENGE AN OPPONENT
      </h3>
      <Input
        id="guestName"
        label="Player ID"
        register={register}
        errors={errors}
        disabled={isLoading}
        tooltipContent="Error!"
        getFieldState={getFieldState}
        getValues={getValues}
      />
      <div>Player ID include ID and UserName</div>
      <Button variant="filled" type="submit">
        <div className="px-4">Invite Player</div>
      </Button>
    </form>
  );
};

export default CreateRoomModal;
