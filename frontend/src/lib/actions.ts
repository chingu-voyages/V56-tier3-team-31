"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  console.log("from actions.ts - ", formData);

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          console.error("Invalid credentials");
          return "Invalid credentials.";
        default:
          console.error("An unexpected error occurred:", error);
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
