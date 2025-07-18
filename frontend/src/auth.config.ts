// https://nextjs.org/learn/dashboard-app/adding-authentication

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnStatusDisplay = nextUrl.pathname.startsWith(
        "/patient-status-display"
      );
      const isOnStatusUpdate = nextUrl.pathname.startsWith(
        "/patient-status-update"
      );
      const isOnPatientInfo = nextUrl.pathname.startsWith(
        "/patient-information"
      );
      if (isOnStatusUpdate || isOnPatientInfo) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && !isOnStatusDisplay) {
        return Response.redirect(new URL("/patient-status-display", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
