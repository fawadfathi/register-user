import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./data/user";
import db from "@/lib/db";
import authConfig from "@/auth.config";
import { UserRole } from "@prisma/client";

// we use Prisma in the callback which is not support in the Edge and for this resone we seperate the auth from auth-config
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    // in the token we have the id which is stored in the (sub)
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      // in here we get the id from the (token.sub) and store it in the existingUser
      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
