"use client";

import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { toast } from "sonner";

import {
    useGithubSignIn,
    useGoogleSignIn,
} from "@/core/hooks/signin-providers";

import { Icons } from "../icons";
import { Badge } from "../ui/badge";
import { auth } from "@/core/database/firebase";
import Link from "../core/Link";
import Image from "next/image";

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
        <div className="flex gap-2 flex-col justify-between fixed bottom-2 right-4">
            <span className="flex gap-2">
                <Link
                    className="flex grow gap-2 space-between"
                    href="https://github.com/remcostoeten"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icons.gitHub width={16} className="mr-2" />
                    <Badge variant="secondary" className="justify-end">
                        @remcostoeten
                    </Badge>
                </Link>
                <Link
                    className="flex grow gap-2 space-between"
                    href="mailto:remcostoeten@hotmail.com"
                >
                    <Icons.mail width={16} />
                    <Badge variant="secondary" className="justify-end">
                        remcostoeten@hotmail.com
                    </Badge>
                </Link>
            </span>
            <p className="mb-6 flex flex-end flex-col-reverse items-start md:flex-row md:items-center">
                With
                <span className=" animate-pulse  px-2"> ❤️</span>
                {/* <span className="mx-1 text-red-400 animate-pulse"></span> */}
                by remco stoeten
            </p>{" "}

        </div>
    );
}
function HeartIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="svg-icon"
            style={{ width: "1em", height: "1em", verticalAlign: "middle" }}
            fill="currentColor"
            viewBox="0 0 1024 1024"
        >
            <path d="M704 112h-2c-79.4 0-149.6 42-190 104-40.4-62-110.6-104-190-104h-2C196.2 113.2 96 213.8 96 338c0 74 32.4 179 95.6 265.4C312 768 512 912 512 912s200-144 320.4-308.6C895.6 517 928 412 928 338c0-124.2-100.2-224.8-224-226z"></path>
        </svg>
    );
}