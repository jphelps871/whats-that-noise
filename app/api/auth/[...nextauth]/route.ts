import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { requireEnv } from "@/lib/utils";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from  "@/prisma/lib/client";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: requireEnv(process.env.AUTH_GITHUB_ID, "AUTH_GITHUB_ID"),
      clientSecret: requireEnv(process.env.AUTH_GITHUB_SECRET, "AUTH_GITHUB_SECRET"),
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
    // ...add more providers here
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },

  adapter: PrismaAdapter(prisma),

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };