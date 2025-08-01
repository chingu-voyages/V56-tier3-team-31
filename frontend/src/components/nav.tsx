"use client";

import React from "react";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";

interface NavProps {
  userRole: "admin" | "member" | null;
  pathname: string;
}

const Nav = ({ userRole, pathname }: NavProps) => {
  return (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          data-active={pathname === "/"}
          className={navigationMenuTriggerStyle()}
        >
          <Link
            href="/"
            className={`hover:font-bold ${
              pathname === "/" && "underline underline-offset-4"
            }`}
          >
            Home
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          data-active={pathname === "/patient-status-display"}
          className={navigationMenuTriggerStyle()}
        >
          <Link
            href="/patient-status-display"
            className={`hover:font-bold ${
              pathname === "/patient-status-display" &&
              "underline underline-offset-4"
            }`}
          >
            Patient Status Display
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      {userRole && (
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            data-active={pathname === "/patient-status-update"}
            className={navigationMenuTriggerStyle()}
          >
            <Link
              href="/patient-status-update"
              className={`hover:font-bold ${
                pathname === "/patient-status-update" &&
                "underline underline-offset-4"
              }`}
            >
              Patient Status Update
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      )}

      {userRole === "admin" && (
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            data-active={pathname === "/patient-information"}
            className={navigationMenuTriggerStyle()}
          >
            <Link
              href="/patient-information"
              className={`hover:font-bold ${
                pathname === "/patient-information" &&
                "underline underline-offset-4"
              }`}
            >
              Patient Information
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      )}
    </>
  );
};

export default Nav;
