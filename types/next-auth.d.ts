import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      status: string | null;
      company: string | null;
      accessToken: string;
      refresToken: string;
    };
    message?: string;
  }
}
