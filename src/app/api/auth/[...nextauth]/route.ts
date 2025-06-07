// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github"; // or whatever provider you use

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...other providers
  ],
  // other config options if needed
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
