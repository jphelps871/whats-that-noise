import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { requireEnv } from "@/utils/handle-production-errors";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/prisma/client";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: requireEnv(process.env.GITHUB_ID, "GITHUB_ID"),
      clientSecret: requireEnv(process.env.GITHUB_SECRET, "GITHUB_SECRET"),
    }),
    // ...add more providers here
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };