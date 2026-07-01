import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { requireEnv } from "@/lib/utils";
import { prisma } from  "@/prisma/lib/client";
import bcrypt from "bcryptjs";

export const config = {
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

  // session and user do not contain id, included it below
  callbacks: {
    jwt({token, user}) {
      if (user) token.id = user.id
      return token
    },

    session({session, token}) {
      if (session.user) session.user.id = token.id
      return session
    }
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },

  adapter: PrismaAdapter(prisma),

  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config)
}