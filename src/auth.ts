import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

export const authConfig = {
  providers: [GitHub],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      return pathname.startsWith("/dashboard") ? !!auth?.user : true;
    },
  },
} satisfies NextAuthConfig;