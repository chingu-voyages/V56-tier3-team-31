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
import useMediaQuery from "@/hooks/useMediaQuery";

interface HeaderClientProps {
  userRole: "admin" | "member" | null;
  isAuthenticated: boolean;
}

const HeaderClient = ({ userRole, isAuthenticated }: HeaderClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isBiggerThanMdScreen = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (isBiggerThanMdScreen) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, [pathname, isBiggerThanMdScreen]);

  return (
    <div className="flex flex-col items-center">
      <Link href={"/"} className="block">
        <Image
          src="/header-logo.png"
          alt="surgery status board"
          width={150}
          height={150}
          className="rounded-lg mx-auto m-4"
        />
      </Link>

      <Button
        className="m-1 cursor-pointer md:hidden"
        variant={"ghost"}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu />
        Menu
      </Button>

      {isMenuOpen && (
        <NavigationMenu className="w-full max-w-none first:w-full">
          <NavigationMenuList className="flex flex-col sm:flex-row sm:flex-wrap">
            <Nav userRole={userRole} pathname={pathname} />

            {isAuthenticated && (
              <NavigationMenuItem className="sm:basis-[49%] sm:order-2">
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
