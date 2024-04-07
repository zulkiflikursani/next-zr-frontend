import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credensials",
      credentials: {
        username: {
          label: "Email:",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Passowod:",
          type: "password",
          placeholder: "Passoword",
        },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.username,
              password: credentials?.password,
            }),
          }
        );

        const user = await res.json();
        cookies().set("jwt", user.accessToken);

        if (user.email) {
          return await user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      session.user = token as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
