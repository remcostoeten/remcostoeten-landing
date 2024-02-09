// @ts-nocheck
"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { User } from "firebase/auth"

import { UserInfo } from "@/core/types/kanban"

import { auth } from "./firebase"

type AuthState = {
  user: UserInfo | null
  loading: boolean
}

export function useFirebaseAuth() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const authStateChanged = async (authState: User | null) => {
    if (!authState) {
      setUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const u: UserInfo = {
      displayName: authState.displayName,
      email: authState.email,
      phoneNumber: authState.phoneNumber,
      photoURL: authState.photoURL,
      providerId: authState.providerId,
      uid: authState.uid,
    }
    setUser(u)
    setLoading(false)
  }

  // listen for firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged)
    return () => unsubscribe()
  }, [])

  return {
    user,
    loading,
  }
}

export const authContext = createContext<AuthState>({
  user: null,
  loading: false,
})

/**
 * Retrieve user and loading from authContext
 */
export const useAuth = () => {
  return useContext(authContext)
}
