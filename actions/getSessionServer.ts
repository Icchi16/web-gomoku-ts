import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerComponentClient({ cookies });

const getSession = async () => {
  return await supabase.auth.getSession();
};

export default getSession;
