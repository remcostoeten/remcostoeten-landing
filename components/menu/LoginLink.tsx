"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Label } from "@radix-ui/react-label"

import { Icons } from "../icons"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import LoginLinkAuth from "./LoginLinkAuth"
import { toast } from "sonner"

export default function LoginAnchor() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault()
        toast.success("Redirecting you to the login page!")
        router.push("/api/auth/login")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router])

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger className="flex w-full items-center justify-between">
          <LoginLinkAuth />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
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
                <Button variant="outline">
                  <Icons.gitHub className="mr-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="flex gap-2">
                  Google
                </Button>
              </div>
              {isSignup && (
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Your name" />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="test@test.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
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
  )
}
