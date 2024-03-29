import { boardArray } from "@/store/boardSlice";
import { Database } from "@/types/supabase.types";
import { UpdateProfileDetails } from "@/types/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = request.json();
}
