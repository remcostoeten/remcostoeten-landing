"use client";

import { Icons } from "../icons";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { auth } from "@/core/database/firebase";
import {
    useGithubSignIn,
    useGoogleSignIn,
} from "@/core/hooks/signin-providers";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { toast } from "sonner";

export default function LoginLink() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [signOut, loading, error] = useSignOut(auth);
    const [user] = useAuthState(auth);
    const [wasLoggedIn, setWasLoggedIn] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "k") {
                event.preventDefault();
                if (!user) {
                    setIsOpen((prevIsOpen) => !prevIsOpen);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [user]);

    useEffect(() => {
        if (user) {
            setWasLoggedIn(true);
            if (isOpen) {
                setIsOpen(false);
                toast("Logged in successfully");
            }
        } else if (wasLoggedIn) {
            setWasLoggedIn(false);
            toast("Logged out successfully");
        }
    }, [user, isOpen, wasLoggedIn]);

    const [signInWithGithub, userGithub, loadingGithub, errorGithub] =
        useGithubSignIn();
    const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
        useGoogleSignIn();

    const handleLogout = () => {
        signOut();
        toast("Logged out successfully");
    };

    return (
        <div className="hidden sm:flex login-wrapper  flex-col gap-2">
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger className="flex w-full items-center justify-between">
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-col items-start gap-2"></div>
                        <div className="flex grow justify-between items-center gap-2">
                            <div className="flex space-between items-center gap-2">
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
                        </div>
                    </div>
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
                                    <Icons.github className="h-4 w-4" />
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
        </div>
    );
}
