// This is for password hashing using the library bcrypt - middleware doesn't handle bcrypt, so we need to have this separately.

import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "@/types/db";
import bcrypt from "bcrypt";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const users = client.db().collection("User");
    const user = await users.findOne({ email });
    if (!user) return undefined;
    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      password: user.password,
    } as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(client),
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
