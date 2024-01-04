"use client"

import Link from "next/link"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"

import { Icons } from "../icons"
import { Badge } from "../ui/badge"

export default function LoginLinkAuth() {
  const { isAuthenticated, getUser } = useKindeBrowserClient()

  return (
    <span className="space-between flex items-center">
      {isAuthenticated ? (
        <>
          <Icons.shortcut className="mr-2" />
          <span className="">cmd + k</span>
        </>
      ) : (
        <Link href="/api/auth/login" className="flex grow items-center gap-2">
          <Icons.shortcut className="mr-2" />
          <span className="">cmd + k</span>
        </Link>
      )}

      <Badge variant="secondary" className="justify-end">
        {isAuthenticated ? (
          <Link href="/api/auth/logout">Logout</Link>
        ) : (
          <Link href="/api/auth/login">
            {isAuthenticated ? "Sign Up" : "Login"}
          </Link>
        )}
      </Badge>
    </span>
  )
}
