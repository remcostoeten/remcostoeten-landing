'use client';
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

import Seperator from "./layout/Seperator";
import LoginAnchor from "./menu/LoginLink";
import MenuItem from "./menu/MenuItem";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const navigationMenu = [
  { label: "Home", icon: Icons.home },
  // { label: "Dashboard", icon: Icons.layoutGrid },
  // { label: "Projects", icon: Icons.code },
  { label: "Blog", icon: Icons.code },
  { label: "issues", icon: Icons.todo },
  // { label: "github-issues", icon: Icons.code },
  // { label: "Learn", icon: Icons.lightbulb },
  { label: "About", icon: Icons.user },
  { label: "Contact", icon: Icons.mail },
  // { label: "Guestbook", icon: Icons.code },
  // { label: "Playground", icon: Icons.code },
]

export default function SiteHeader({
  children,
}: {
  children?: React.ReactNode
}) {
  const { isAuthenticated, getUser } = useKindeBrowserClient();
  const [user, setUser] = useState(null);

  return (
    <>
      <aside className="hidden min-h-[97vh] flex-col text-blacktheme sm:flex dark:text-accent">
        <div className="flex flex-col gap-2.5 text-xl">
          <div className="relative">
            {!isAuthenticated && (
              <Image
                src="/remco-avatar-compressed.webp"
                alt="Remco Stoeten"
                width={50}
                height={50}
                className="z-20 rounded-full"
              />
            )}



            {isAuthenticated && (
              <Avatar>
                <AvatarImage src={user?.picture} />
                <AvatarFallback>       {user?.given_name?.[0]}
                  {user?.family_name?.[0]}</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
        <div className="mb-3">
          <div className="font-bold text-blacktheme dark:text-white">
            Remco Stoeten
          </div>
          <div className="text-sm text-blacktheme dark:text-gray-400">
            @remcosoeten
          </div>
        </div>
        <div className="mb-6 flex grow flex-col">
          <div className="mb- flex items-center">
            <span className="work-pulse pulser mr-2 h-2 w-2 rounded-full bg-green-400" />
            <span className="text-sm">Open for collabs!</span>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </div>
          <Seperator spacing="12" />
          <ul className="grow">
            {navigationMenu.map((navItem, index) => (
              <MenuItem
                key={index}
                title={navItem.label}
                href={
                  navItem.label === "Home"
                    ? "/"
                    : `/ ${navItem.label.toLowerCase()}`
                }
                icon={navItem.icon ? <navItem.icon /> : null}
                isExternal={false}
              />
            ))}
          </ul>

          <p className="mb-6 flex items-center">
            With
            <span className="mx-1 animate-pulse">❤</span>
            by remco stoeten
          </p>{" "}
        </div>
      </aside >
    </>
  );
}
