// https://nextjs.org/learn/dashboard-app/adding-authentication

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    // Include role in JWT token
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    // Include role in session
    session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role;
      console.log("User role from auth.config - ", userRole);

      const isOnStatusDisplay = nextUrl.pathname.startsWith(
        "/patient-status-display"
      );
      const isOnStatusUpdate = nextUrl.pathname.startsWith(
        "/patient-status-update"
      );
      const isOnPatientInfo = nextUrl.pathname.startsWith(
        "/patient-information"
      );

      // redirect unauthenticated users to login page
      if (!isLoggedIn && (isOnStatusUpdate || isOnPatientInfo)) {
        return false;
      }

      // role based access control
      if (isLoggedIn) {
        // admin can access all pages
        if (userRole === "admin") {
          return true;
        }

        // member can access status display and update, but not patient information
        if (userRole === "member" && isOnPatientInfo) {
          return Response.redirect(new URL("/patient-status-display", nextUrl));
        }

        if (!isOnStatusDisplay && !isOnStatusUpdate && !isOnPatientInfo) {
          return Response.redirect(new URL("/patient-status-display", nextUrl));
        }

        return true; // member can access status display and update
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
