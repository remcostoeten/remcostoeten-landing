import { useState, useEffect, createContext, useContext } from "react";
import { User, UserInfo } from "firebase/auth";
import { auth } from "../lib/firebase";
import { AuthState } from "../types/kanban";

/**
 * Firebase auth subscriber. return user and loading
 */
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

  // listen for firebase state change
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

/**
 * Retrieve user and loading from authContext
 */
export const useAuth = () => {
  return useContext(authContext);
};

