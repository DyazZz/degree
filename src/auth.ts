import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import GitHub from "next-auth/providers/github";
import Yandex from "next-auth/providers/yandex";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "/logo.png",
  },
  providers: [GitHub, Yandex],
  adapter: PrismaAdapter(prisma),
});
