'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

import Seperator from "./layout/Seperator";
import LoginLinkAuth from "./menu/LoginLinkAuth";
import MenuItem from "./menu/MenuItem";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const navigationMenu = [
  { label: "Home", icon: Icons.home, href: "/" },
  { label: "Blog", icon: Icons.code, href: "blog" },
  { label: "Issues", icon: Icons.todo, href: "issues" },
  { label: "Guestbook", icon: Icons.PencilIcon, href: "guestbook" },
  { label: "About", icon: Icons.user },
  { label: "Contact", icon: Icons.mail },
];

export default function SiteHeader({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);

    // It's important to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  const isAuthenticated = user !== null;

  return (
    <>
      <aside className="hidden min-h-[97vh] flex-col text-blacktheme sm:flex dark:text-accent">
        <div className="mb-6 flex items-center gap-2">
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
              {isAuthenticated && user?.photoURL && (
                <Avatar>
                  <AvatarImage src={user?.photoURL} />
                  <AvatarFallback>
                    {" "}
                    {user?.displayName?.[0]}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
          <div>
            <div className="font-bold text-blacktheme dark:text-white">
              {isAuthenticated && user?.displayName && (
                <>{user?.displayName}</>
              )} {!isAuthenticated && <>Remco Stoeten</>}
            </div>
            <div className="text-sm text-blacktheme dark:text-gray-400">
              {!isAuthenticated && <>@remcostoeten</>}
            </div>
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
            {navigationMenu.map((navItem, index) => {
              return (
                <MenuItem
                  key={index}
                  title={navItem.label}
                  href={navItem.href ? navItem.href : "#"}
                  icon={navItem.icon ? <navItem.icon /> : null}
                  isExternal={false}
                />
              );
            })}
          </ul>
          <LoginLinkAuth />
        </div>
        <p className="mb-6 flex flex-col-reverse items-start md:flex-row md:items-center">
          With
          <span className="mx-1 animate-pulse">❤</span>
          by remco stoeten
        </p>{" "}
      </aside >
    </>
  );
}
