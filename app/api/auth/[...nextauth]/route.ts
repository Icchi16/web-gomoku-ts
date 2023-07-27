import NextAuth, { AuthOptions } from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { CredentialsProvider } from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABSE_URL
  })
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
