//https://firebase.google.com/docs/auth/web/google-signin?hl=en&authuser=0#web-version-9_1

import { app } from "@/core/database/firebase"
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signOut as signOutAlias,
} from "firebase/auth"

const provider = new GoogleAuthProvider()

const auth = getAuth(app)
auth.useDeviceLanguage()

const signIn = () => {
  signInWithRedirect(auth, provider)
}

const signOut = () => {
  return signOutAlias(auth)
  //   .then(() => {
  //     // Sign-out successful.
  //   })
  //   .catch((error) => {
  //     /g/ An error happened.
  //   });
}

export { auth, signIn, signOut }
