import React from "react";
import { auth } from "@/auth";
import HeaderClient from "./headerClient";

const Header = async () => {
  const session = await auth();
  console.log("Session in Header:", session);
  const userRole = session?.user?.role;

  return (
    <header>
      <HeaderClient userRole={userRole} isAuthenticated={!!session} />
    </header>
  );
};

export default Header;
