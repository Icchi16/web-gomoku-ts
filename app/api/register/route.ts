import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database } from "@/types/supabase.types";
import { metadata } from "../../layout";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const body = await request.json();
  const { username, email, password, isGuest } = body;

  const supabase = createRouteHandlerClient<Database>({ cookies });

  await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username: username,
        is_guest: isGuest,
      },
      emailRedirectTo: `${requestUrl.origin}/api/callback`,
    },
  });


    status: 301,
  });
}
