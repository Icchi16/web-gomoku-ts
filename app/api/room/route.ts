import { boardArray } from "@/store/boardSlice";
import { Database } from "@/types/supabase.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const players = await request.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data: currentSession, error: currentSessionError } =
    await supabase.auth.getSession();

  if (currentSessionError) {
    throw new NextResponse(`${currentSessionError}`, { status: 500 });
  }

  const currentPlayer = players[Math.round(Math.random())];

  const { data: newRoom, error: newRoomError } = await supabase
    .from("rooms")
    .insert([
      {
        players: players,
        current_player: currentPlayer,
        is_over: false,
        board: JSON.stringify(boardArray),
      },
    ])
    .select()
    .single();

  if (newRoomError) {
    throw new NextResponse(`${newRoomError}`, { status: 500 });
  }

  return NextResponse.json(newRoom);
}

export async function PUT(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const body = await request.json();
  const { currentPlayer, boardData, isOver, roomId } = body;

  const { data: updatedRoom, error } = await supabase
    .from("rooms")
    .update({
      board: JSON.stringify(boardData),
      current_player: currentPlayer!,
      is_over: isOver,
    })
    .eq("id", roomId)
    .select();

  if (error) {
    throw new NextResponse(`${error.message}`, { status: 500 });
  }

  return NextResponse.json(updatedRoom);
}
