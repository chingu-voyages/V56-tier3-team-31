import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import { auth, signOut } from "@/auth";

const Header = async () => {
  const session = await auth();
  console.log("Session in Header:", session);
  const userRole = session?.user?.role;

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/patient-status-display">Patient Status Display</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {userRole && (
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/patient-status-update">Patient Status Update</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}

          {userRole === "admin" && (
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/patient-information">Patient Information</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}

          {session && (
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <form
                  className="cursor-pointer"
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button className="cursor-pointer">Log Out</button>
                </form>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Header;
