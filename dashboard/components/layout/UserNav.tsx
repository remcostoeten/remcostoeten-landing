"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/core/database/firebase";
import { toast } from "sonner";
import { useGithubSignIn, useGoogleSignIn } from "@/hooks/signin-providers";
import { Badge, Label } from "../ui/ui-imports";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import Image from "next/image";
import UserGreeting from "@c/auth/UserGreeting";
import { Icons } from "@c/theme/icons";

export function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [signOut] = useSignOut(auth);
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

  const [signInWithGithub] = useGithubSignIn();
  const [signInWithGoogle] = useGoogleSignIn();

  const handleLogout = () => {
    signOut();
    toast("Logged out successfully");
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger className="flex w-full items-center justify-between">
          {user ? (
            <>
              <UserGreeting />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative size-8 rounded-full"
                  >
                    {!user && (
                      <Avatar>
                        <AvatarFallback>Guest</AvatarFallback>
                      </Avatar>
                    )}

                    <Button
                      className="rounded-full"
                      variant="outline"
                      size="icon"
                    >
                      {user && user?.photoURL && (
                        <Image
                          className="rounded-full"
                          fill
                          src={user?.photoURL}
                          alt="user"
                        />
                      )}
                    </Button>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.displayName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Billing
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>New Team</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
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
            <Icons.cancel className="size-4" />
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
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => signInWithGithub()}>
                    <Icons.gitHub className="size-4" />
                  </Button>
                  <Button variant="outline" onClick={() => signInWithGoogle()}>
                    <Icons.google.color className="size-4" />
                    google
                  </Button>
                </div>
                {isSignup && (
                  <div className="grid gap-2">
                    <Label>Name</Label>
                    <Input id="name" type="text" placeholder="Your name" />
                  </div>
                )}
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input id="email" type="email" placeholder="test@test.com" />
                </div>
                <div className="grid gap-2">
                  <Label>Password</Label>
                  <Input disabled id="password" type="password" />
                </div>
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
    </>
  );
}
