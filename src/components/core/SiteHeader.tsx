"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

import { navigationMenuItems } from "@/core/config/menu";

import Seperator from "../layout/Seperator";
import LoginLinkAuth from "../menu/LoginLinkAuth";
import MenuItem from "../menu/MenuItem";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ThemeToggle } from "../theme-toggle";
import AuthMenu from "../menu/AuthMenu";

export default function SiteHeader({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);

    return () => unsubscribe();
  }, []);

  const isAuthenticated = user !== null;

  return (
    <>
      <aside className="hidden min-h-[97vh] flex-col text-blacktheme dark:text-accent sm:flex">
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
                  <AvatarFallback> {user?.displayName?.[0]}</AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between  w-full text-blacktheme dark:text-white  leading-none font-normal">
            {isAuthenticated && user?.displayName && (
              <>
                {user.displayName.split(" ").map((part, index) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < user.displayName.split(" ").length - 1 && <br />}
                  </React.Fragment>
                ))}
                <AuthMenu />
              </>
            )}{" "}
            <div className="flex flex-col">
              {!isAuthenticated && <>Remco Stoeten</>}
              <div className="text-sm text-blacktheme dark:text-gray-400">
                {!isAuthenticated && <>@remcostoeten</>}
              </div>{" "}
            </div>
          </div>
        </div>
        <div className="mb-6 flex grow flex-col">
          <div className="mb- flex items-center">
            <span className="work-pulse pulser mr-2 size-2 rounded-full bg-green-400" />
            <span className="text-sm">Open for collabs!</span>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </div>
          <Seperator spacing="12" />
          <ul className="grow">
            {navigationMenuItems.map((navItem, index) => {
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
          <span className="mx-1 text-red-400 animate-pulse">❤</span>
          by remco stoeten
        </p>{" "}
      </aside>
    </>
  );
}
