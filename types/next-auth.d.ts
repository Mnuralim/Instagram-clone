import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: string;
      username: string;
      email: string;
      refreshtoken: string;
      profile_image: string;
    };
  }
}
