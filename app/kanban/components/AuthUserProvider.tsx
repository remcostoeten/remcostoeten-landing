'use client';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authContext, useFirebaseAuth } from "@/core/hooks/useAuth";
import { usePathname } from 'next/navigation'

/**
 * context provider. use useAuth to retrieve the value
 */
export const AuthUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useFirebaseAuth();
  const pathname = usePathname();

  // redirect to homepage if not logged in
  const router = useRouter();
  useEffect(() => {
    if (!auth.loading && !auth.user && pathname !== "/") router.push("/");
  }, [router, auth, pathname]);

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
