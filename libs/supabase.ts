import { Database } from "@/types/supabase.types";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

declare global {
  var supabase: SupabaseClient | undefined;
}

const supabase =
  globalThis.supabase ||
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

if (process.env.NODE_ENV !== "production") globalThis.supabase = supabase;

export default supabase;
