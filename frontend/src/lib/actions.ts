"use server";

import { signIn } from "@/auth";
import { patientStatuses } from "@/util";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function updatePatientStatus(
  prevState: string | undefined,
  formData: FormData
) {
  console.log("from actions.ts - updatePatientStatus - formData:", formData);
  const patientNumber = formData.get("patientNoForFormData");
  const newStatusValue = formData.get("newStatus");

  if (!patientNumber || !newStatusValue) {
    // throw new Error("Missing form data");
    return "Missing form data";
  }

  const newStatus = patientStatuses.find(
    (status) => status.value === newStatusValue
  )?.id;

  if (!newStatus) {
    // throw new Error(`Unknown status: ${newStatusValue}`);
    return `Unknown status: ${newStatusValue}`;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/patients/updatePatientStatus/${patientNumber}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (!response.ok) {
      console.error(await response.text());
      // throw new Error("Failed to update patient");
      return "Failed to update patient";
    }

    // return await response.json();
    // return undefined; // success, no error
  } catch (error) {
    console.error("Error updating patient status:", error);
    // throw new Error("Failed to update patient status.");
    return "Failed to update patient status.";
  }

  revalidatePath("/patient-status-update");
  redirect(`/patient-status-update?patientNo=${patientNumber}`);
}
