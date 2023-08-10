import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const getRoomById = async (roomId: string) => {
  const supabase = createServerComponentClient({ cookies });

  const { data: room, error } = await supabase
    .from("rooms")
    .select('*, board("*")')
    .eq("id", roomId)
    .single();

  if (error) {
    throw new NextResponse("Can't get room's data", { status: 401 });
  }

  return room;
};

export default getRoomById;
