"use client";

import Board from "@/components/body/boardGame/Board";
import Header from "@/components/body/header/Header";
import { useBoardSlice } from "@/store/boardSlice";
import { useTheme } from "@material-tailwind/react";
import { use, useEffect } from "react";
import supabase from "../../libs/SupabaseProvider";

const UserPage = async () => {
  const theme = useTheme();
  const { bgColor1 } = theme.colors;

  // const { data, error } = await supabase.auth.signUp({
  //   email: "quangduya2160894@test.com",
  //   password: "123456",
  //   options: {
  //     emailRedirectTo: window.location.origin,
  //   },
  // });
  // const { user } = data;
  // console.log(error);

  return (
    <div
      className="h-full bg-blue-gray-900"
      style={{ backgroundColor: bgColor1 }}
    >
      <div className="fixed inset-0 left-80">Hi</div>
    </div>
  );
};

export default UserPage;
