import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ patientNo: string }> }
) {
  console.log("CALLED");

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("Token from patientNo route:", token);

  // Create JWT matching the Express backend structure (authentication.js)
  const backendJWT = jwt.sign(
    {
      name: token.email,
      userId: token.sub,
      role: token.role,
    },
    process.env.JWT_SECRET, // this should match the Express JWT_SECRET
    {
      expiresIn: process.env.JWT_LIFETIME || "1d", // match the Express JWT_LIFETIME
    }
  );

  const cookieHeader = cookie.serialize("token", backendJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1day
  });

  const { patientNo } = await params;
  console.log("Patient No. from params:", patientNo);

  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/patients/${patientNo}`,
      {
        headers: {
          Cookie: cookieHeader,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch patient data:", response.statusText);
      return Response.json(
        { error: "Failed to fetch patient data" },
        { status: response.status }
      );
    }

    const patientData = await response.json();
    console.log("Patient data fetched successfully:", patientData);
    return Response.json(patientData);
  } catch (error) {
    console.error("Error fetching patient:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
