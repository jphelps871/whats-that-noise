import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const requireEnv = (value: string | undefined, provider: string) => {
  if (!value) throw new Error(`Missing ${provider} OAuth environment variable`);
  return value
}

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: requireEnv(process.env.GITHUB_ID, "GITHUB_ID"),
      clientSecret: requireEnv(process.env.GITHUB_SECRET, "GITHUB_SECRET"),
    }),
    // ...add more providers here
  ],
});

export { handler as GET, handler as POST };