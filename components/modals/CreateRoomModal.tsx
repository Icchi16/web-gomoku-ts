"use client";

import { useTheme } from "@/hooks/useTheme";
import Input from "../Input";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../Button";

const CreateRoomModal = () => {
  const { baseTextColor, bgColor2 } = useTheme().colors;
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      playerId: "",
    },
  });

  return (
    <form
      className="flex flex-col justify-center items-center w-fit p-8 rounded-2xl"
      style={{ backgroundColor: bgColor2 }}
    >
      <h3
        className="text-4xl font-bold tracking-wider"
        style={{ color: baseTextColor }}
      >
        CHALLENGE AN OPPONENT
      </h3>
      <Input
        id="playerId"
        label="Player ID"
        register={register}
        errors={errors}
        disabled={isLoading}
        tooltipContent="Something went wrong!"
        getFieldState={getFieldState}
        getValues={getValues}
      />
      <div>Player ID include ID and UserName</div>
      <Button variant="filled">
        <div className="px-4">Invite Player</div>
      </Button>
    </form>
  );
};

export default CreateRoomModal;
