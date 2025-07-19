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
    console.log("getUser called with email:", email);

    // Check if client is connected
    console.log("Database client state:", client.topology?.isConnected());

    const db = client.db("Surgery-Status");
    console.log("Database name:", db.databaseName);

    const users = db.collection("User");
    console.log("Collection name: User");

    // Log the exact query being performed
    console.log("Querying with:", { email });

    // const users = client.db("Surgery-Status").collection("User");
    const user = await users.findOne({ email });
    console.log("Raw user result:", user);
    console.log("User found:", !!user);

    if (!user) {
      // Let's also try to see what users exist
      const allUsers = await users.find({}).limit(5).toArray();
      console.log(
        "Sample users in collection:",
        allUsers.map((u) => ({ email: u.email, id: u._id }))
      );
      return undefined;
    }
    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
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
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);

        console.log("from auth.ts - credentials: ", credentials);
        console.log(
          "from auth.ts - parsedCredentials.success: ",
          parsedCredentials.success
        );

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          console.log("from auth.ts - email: ", email);
          const user = await getUser(email);
          console.log("from auth.ts - user: ", user);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log("from auth.ts - Invalid credentials");
        return null;
      },
    }),
  ],
});
