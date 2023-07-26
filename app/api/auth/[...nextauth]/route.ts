import NextAuth, { AuthOptions } from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { CredentialsProvider } from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  adapter: {SupabaseAdapter()},
  providers: [],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
