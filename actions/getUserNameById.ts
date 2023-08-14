import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

const getUserNameById = async (userId: string) => {
  const supabase = createClientComponentClient<Database>();

  const { data: fetchedName, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userId)
    .single();

  if (error) {
    throw new NextResponse(JSON.stringify(error.message), { status: 500 });
  }

  const userName = /['"]/g.test(fetchedName.username![0])
    ? fetchedName.username?.substring(1, fetchedName.username.length - 1)
    : fetchedName.username;

  return userName;
};

export default getUserNameById;
