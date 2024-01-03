'use client';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Icons } from "../icons";
import { LogoutLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export default function LoginLinkAuth() {
  const { isAuthenticated, getUser } = useKindeBrowserClient();

  return (
    <>
      {isAuthenticated ? (
        <><Icons.shortcut className="mr-2" /><span className="">cmd + k</span></>
      ) : (
        <Link href="/api/auth/login" className="flex grow items-center gap-2">
          <Icons.shortcut className="mr-2" />
          <span className="">cmd + k</span>
        </Link>
      )
      }

      <Badge variant="secondary" className="justify-end">
        {isAuthenticated ? (
          <Link href="/api/auth/logout">Logout</Link>
        ) : (
          <Link href="/api/auth/login">
            {isAuthenticated ? "Sign Up" : "Login"}
          </Link>
        )}
      </Badge>
    </>
  );
}
