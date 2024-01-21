"use client"

import React, { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

import { authContext, useFirebaseAuth } from "../../src/utils/auth"

/**
 * context provider. use useAuth to retrieve the value
 */
export const AuthUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useFirebaseAuth()
  const pathname = usePathname()
  // redirect to homepage if not logged in
  const router = useRouter()
  useEffect(() => {
    if (!auth.loading && !auth.user && pathname !== "/") router.push("/")
  }, [auth, pathname, router])

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
