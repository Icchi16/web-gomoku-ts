"use client";

import { useTheme } from "@/hooks/useTheme";
import Input from "../Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { NextResponse } from "next/server";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

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
      .ilike("username", `%${guestName}%`)
      .single();

    if (error) {
      toast.error("Can't find user");
      throw new NextResponse("can't find user", { status: 400 });
    } else {
      toast.info("Sending your challenge letter!");

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
      className="flex flex-col justify-center items-center w-fit p-8 rounded-2xl "
      style={{ backgroundColor: bgColor2 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3
        className="text-4xl font-bold tracking-wider mb-10"
        style={{ color: baseTextColor }}
      >
        CHALLENGE AN OPPONENT
      </h3>
      <div className=" px-28 w-full flex flex-col space-y-2 ">
        <div className="mb-1">
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
        </div>
        <div style={{ color: baseTextColor }} className="text-xs text-center ">
          <div className="flex space-x-2 justify-center items-center mb-6">
            <div className="text-lg">
              <FontAwesomeIcon icon={faInfoCircle} />
            </div>
            <div className="flex flex-col items-start">
              <p>Player ID include #ID and Username</p>
              <p>You can look for ID on the right of your avatar</p>
            </div>
          </div>
        </div>
        <Button variant="filled" type="submit">
          <div className="px-4">Invite Player</div>
        </Button>
      </div>
    </form>
  );
};

export default CreateRoomModal;
