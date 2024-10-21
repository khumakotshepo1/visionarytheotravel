import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "./config";

import { getUserByEmail } from "@/server/users.server";
import { userLoginSchema } from "@/zod/schemas/auth.schema";
import { compare } from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = userLoginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);
          if (!user) return null;
          const passwordsMatch = await compare(password, user.password);

          if (passwordsMatch) {
            console.log("Returning user:", user);
            return user;
          }
        }

        return null;
      },
    }),
  ],
});
