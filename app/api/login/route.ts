import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database } from "@/types/supabase.types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);

  const body = await request.json();
  const { email, password } = body;
  
  const supabase = createRouteHandlerClient<Database>({ cookies });

  await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}


