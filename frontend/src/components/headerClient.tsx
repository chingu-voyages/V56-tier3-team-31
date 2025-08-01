"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Nav from "./nav";
import { signOutAction } from "@/lib/actions";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderClientProps {
  userRole: "admin" | "member" | null;
  isAuthenticated: boolean;
}

const HeaderClient = ({ userRole, isAuthenticated }: HeaderClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div className="text-center">
      <Link href={"/"}>
        <Image
          src="/header-logo.png"
          alt="surgery status board"
          width={150}
          height={150}
          className="rounded-lg mx-auto m-4"
        />
      </Link>

      <Button
        className="m-1 cursor-pointer"
        variant={"ghost"}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu />
        Menu
      </Button>

      {isMenuOpen && (
        <NavigationMenu className="w-full max-w-none first:w-full">
          <NavigationMenuList className="grid grid-cols-1">
            <Nav userRole={userRole} pathname={pathname} />

            {isAuthenticated && (
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <form
                    className="cursor-pointer hover:font-bold"
                    action={signOutAction}
                  >
                    <button className="cursor-pointer">Log Out</button>
                  </form>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </div>
  );
};

export default HeaderClient;
