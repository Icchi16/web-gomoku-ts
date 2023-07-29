import bcrypt from "bcrypt";
import supabase from "@/libs/SupabaseProvider";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // try {
  const body = await request.json();

  const { email, username, password } = body;

  if (!username || !password || !email) {
    return new NextResponse("Missing Info", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const { data, error } = await supabase.auth.signUp({
    email: JSON.stringify(email),
    password: JSON.stringify(hashedPassword),
    options: {
      emailRedirectTo: window.location.origin,
    },
  });

  const { user } = data;
  if (error!) {
    return new NextResponse(JSON.stringify(user), { status: 403 });
  }

  return NextResponse.json(user);
  // } catch {}
}
