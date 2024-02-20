/**
 * Custom hooks for signing in with different providers.
 *
 * @module signin-providers
 */

import { auth } from "@/core/database/firebase";
import {
  useSendSignInLinkToEmail,
  useSignInWithApple,
  useSignInWithEmailAndPassword,
  useSignInWithEmailLink,
  useSignInWithFacebook,
  useSignInWithGithub,
  useSignInWithGoogle,
  useSignInWithMicrosoft,
  useSignInWithTwitter,
  useSignInWithYahoo,
  useSignOut,
} from "react-firebase-hooks/auth";

export function useGithubSignIn() {
  return useSignInWithGithub(auth);
}

export function useGoogleSignIn() {
  return useSignInWithGoogle(auth);
}

export function useTwitterSignIn() {
  return useSignInWithTwitter(auth);
}

export function useAppleSignIn() {
  return useSignInWithApple(auth);
}

export function useEmailPasswordSignIn() {
  return useSignInWithEmailAndPassword(auth);
}
export function useEmailLinkSignIn() {
  return useSignInWithEmailLink(auth);
}

export function useFacebookSignIn() {
  return useSignInWithFacebook(auth);
}

export function useMicrosoftSignIn() {
  return useSignInWithMicrosoft(auth);
}

export function useYahooSignIn() {
  return useSignInWithYahoo(auth);
}

/**
 * Custom hook for signing out.
 *
 * @returns The sign-out function.
 */
export function useSignOutHook() {
  return useSignOut(auth);
}

/**
 * Custom hook for sending sign-in link to email.
 *
 * @returns The function for sending the sign-in link to email.
 */
export function useSendEmailLink() {
  return useSendSignInLinkToEmail(auth);
}
