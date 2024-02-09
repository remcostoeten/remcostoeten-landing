"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "@/core/database/firebase";
import ThemeProvider from "./ThemeToggle/theme-provider";

type UserInfo = {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
};

type AuthState = {
  user: UserInfo | null;
  loading: boolean;
};

export function useFirebaseAuth() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const authStateChanged = async (authState: User | null) => {
    if (!authState) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const u: UserInfo = {
      displayName: authState.displayName,
      email: authState.email,
      phoneNumber: authState.phoneNumber,
      photoURL: authState.photoURL,
      providerId: authState.providerId,
      uid: authState.uid,
    };
    setUser(u);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
  };
}

export const authContext = createContext<AuthState>({
  user: null,
  loading: false,
});

export const useAuth = () => {
  return useContext(authContext);
};

export default function Providers({ children }: { children: React.ReactNode; }) {
  const auth = useFirebaseAuth();

  return (
    <authContext.Provider value={auth}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </authContext.Provider>
  );
}