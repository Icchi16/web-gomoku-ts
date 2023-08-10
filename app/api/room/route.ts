import { boardArray } from "@/store/boardSlice";
import { Database } from "@/types/supabase.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data: newBoard, error: newBoardError } = await supabase
    .from("boards")
    .insert({
      board_data: JSON.stringify(boardArray),
      is_over: false,
    })
    .select();

  if (newBoardError) {
    throw new NextResponse(`${newBoardError}`, { status: 500 });
  }

  const { data: currentSession, error: currentSessionError } =
    await supabase.auth.getSession();

  if (currentSessionError) {
    throw new NextResponse(`${currentSessionError}`, { status: 500 });
  }

  const players = [
    "66311767-832b-4259-835e-abe9f85afb29",
    "20d53037-2ac5-459e-a3b3-1cb49ecf5398",
  ];
  const currentPlayer = players[Math.round(Math.random())];

  const { data: newRoom, error: newRoomError } = await supabase
    .from("rooms")
    .insert([
      {
        players: players,
        board: newBoard![0].id,
        current_player: currentPlayer,
      },
    ])
    .select();

  if (newRoomError) {
    throw new NextResponse(`${newRoomError}`, { status: 500 });
  }

  return NextResponse.json(newRoom![0]);
}

// PUT
export async function PUT(request: Request) {}
