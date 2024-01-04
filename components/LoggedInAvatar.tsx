import { useState } from "react"
import Image from "next/image"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"

export default function LoggedInAvatar() {
  const { isAuthenticated, getUser } = useKindeBrowserClient()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  return (
    <>
      {" "}
      {!isLoggedIn ? (
        <Image
          src="/remco-avatar-compressed.webp"
          alt="Remco Stoeten"
          width={50}
          height={50}
          className={`z-20 rounded-full ${isLoggedIn ? "authenticated" : ""}`}
        />
      ) : user?.picture ? (
        <Image
          src={user?.picture}
          width={50}
          height={50}
          className={`z-20 rounded-full ${isLoggedIn ? "authenticated" : ""}`}
          alt="user profile avatar"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="avatar">
          {user?.given_name?.[0]}
          {user?.family_name?.[0]}
        </div>
      )}
    </>
  )
}
