import { BoardData } from "@/app/[roomId]/page";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const body: BoardData = await request.json();
  const { boardId, boxData } = body;

  const { data: updatedBoard, error } = await supabase
    .from("boards")
    .update({ board_data: JSON.stringify(boxData) })
    .eq("id", boardId)
    .select();

  if (error) {
    throw new NextResponse(`${error.message}`, { status: 500 });
  }

  return NextResponse.json(updatedBoard);
}
