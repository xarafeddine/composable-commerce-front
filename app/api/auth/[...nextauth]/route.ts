import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    CredentialsProvider({
      name: "as Guest",
      credentials: {},
      async authorize(credentials) {
        const user = {
          id: Math.random().toString(),
          name: "Guest",
          email: "guest@example.com",
        };
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // block signin if necessary
      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET!,
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
