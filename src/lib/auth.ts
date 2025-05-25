import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Here you would validate the credentials against your database
        // For now, we'll create a consistent mock user based on email
        // In a real app, you'd check against your database

        // Username-г email-аас үүсгэх эсвэл оруулсан утгыг ашиглах
        const username =
          credentials.username ||
          credentials.email
            .split("@")[0]
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

        // Email-аас consistent ID үүсгэх (simple hash)
        const userId = btoa(credentials.email)
          .replace(/[^a-zA-Z0-9]/g, "")
          .substring(0, 16);

        return {
          id: userId,
          email: credentials.email,
          name: credentials.username || username,
          username: username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Google эсвэл бусад provider-аас нэвтэрсэн үед username үүсгэх
      if (account?.provider === "google" && profile?.email && !user.username) {
        user.username = profile.email
          .split("@")[0]
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");
        // Email-аас consistent ID үүсгэх
        user.id = btoa(profile.email)
          .replace(/[^a-zA-Z0-9]/g, "")
          .substring(0, 16);
      }
      return true;
    },
  },
};
