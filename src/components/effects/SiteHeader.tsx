"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { navigationMenuItems } from "@/core/config/menu";

import LoginLinkAuth from "../menu/LoginLinkAuth";
import MenuItem from "../menu/MenuItem";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ThemeToggle } from "../theme-toggle";
import AuthMenu from "../menu/AuthMenu";
import Seperator from "../core/layout/Seperator";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Icons } from "../icons";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/core/database/firebase";

export default function SiteHeader({
    children,
}: {
    children?: React.ReactNode;
}) {
    const [userState, setUserState] = useState<User | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [signOut, loading, error] = useSignOut(auth);
    const [user] = useAuthState(auth);
    const [wasLoggedIn, setWasLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, setUserState);

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
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger className="flex w-full items-center justify-between">
                        <div className="flex grow items-center gap-2">
                            <Icons.shortcut className="mr-2" />
                            <span className="">cmd + k</span>
                        </div>
                        {user ? (
                            <Badge
                                variant="secondary"
                                className="justify-end"
                                onClick={handleLogout}
                            >
                                Logout
                            </Badge>
                        ) : (
                            <Badge
                                variant="secondary"
                                className="justify-end"
                                onClick={() => setIsOpen(true)}
                            >
                                Login
                            </Badge>
                        )}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogCancel className="absolute right-6 top-6 border-0">
                            <Icons.cancel className="h-4 w-4" />
                        </AlertDialogCancel>
                        <Card>
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl">
                                    {isSignup ? "Create an account" : "Sign in"}
                                </CardTitle>
                                <CardDescription>
                                    Enter your email and password below to{" "}
                                    {isSignup ? "create your account" : "sign in"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid grid-cols-2 gap-6">
                                    <Button variant="outline" onClick={() => signInWithGithub()}>
                                        <Icons.gitHub className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" onClick={() => signInWithGoogle()}>
                                        <Icons.google.color className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                            <CardFooter className=" flex flex-col items-start gap-2">
                                <Button className="w-full">
                                    {isSignup ? "Create account" : "Sign in"}
                                </Button>
                                <span onClick={() => setIsSignup(!isSignup)}>
                                    {isSignup ? (
                                        <>
                                            <span>Already have an account? </span>
                                            <span
                                                onClick={() => setIsSignup(!isSignup)}
                                                className="cursor-pointer underline"
                                            >
                                                Sign in
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Don&apos;t have an account? </span>
                                            <span
                                                onClick={() => setIsSignup(!isSignup)}
                                                className="cursor-pointer underline"
                                            >
                                                Sign up
                                            </span>
                                        </>
                                    )}
                                </span>
                            </CardFooter>
                        </Card>
                    </AlertDialogContent>
                </AlertDialog>
            </aside>
        </>
    );
}
