import { useRouter } from "next/navigation"
import { initializeApp } from "firebase/app"
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  updateProfile,
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { toast } from "sonner"
import { MockFirebaseSdk } from 'mock-cloud-firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCkie5a695iQ5sLUUs1TXRbITAro9Aimqk",
  authDomain: "blog-remcostoeten.firebaseapp.com",
  projectId: "blog-remcostoeten",
  storageBucket: "blog-remcostoeten.appspot.com",
  messagingSenderId: "564381304657",
  appId: "1:564381304657:web:d7e882a190d40935f1b570",
}

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
// };


const firebase = new MockFirebaseSdk(
  // Use this function to create a mock auth instance
  () => ({
    currentUser: {
      email: 'stoetenremco.rs@gmail.com',
      uid: 'yqzn5EKH7JUJ1Iom6I4H3gmZizF3'
    }
  }),
  // Use this function to create a mock firestore instance
  () => ({
    collection: () => ({
      doc: () => ({
        get: () => Promise.resolve({
          exists: true,
          id: 'yqzn5EKH7JUJ1Iom6I4H3gmZizF3',
          data: () => ({ /* Document data */ })
        }),
        set: () => Promise.resolve(),
      }),
    }),
  })
);


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)
const googleAuthProvider = new GoogleAuthProvider()
const db = getFirestore()

const signInWithProvider = (providerName: "google" | "github", router) => {
  const provider =
    providerName === "google"
      ? new GoogleAuthProvider()
      : new GithubAuthProvider()
  signInWithPopup(auth, provider)
    .then((userCredential) => {
      const user = userCredential.user
      console.log(`User ${user.displayName} logged in with ${providerName}.`)
      toast.success(`Welcome ${user.displayName}!`)
      router.push("/dashboard")
    })
    .catch((error) => {
      console.error(error)
      toast.warning("something went wrong")
    })
}

export default signInWithProvider

const signOut = () => {
  const router = useRouter()
  try {
    auth.signOut()
    toast.success("Signed out successfully")
    router.push("/dashboard")
  } catch (e) {
    console.error(e)
    toast.warning("something went wrong")
  }
}

const signUp = async (name: string, email: string, password: string) => {
  let result = null
  let error = null
  try {
    result = await createUserWithEmailAndPassword(auth, email, password)
    if (result?.user) {
      await updateProfile(result.user, {
        displayName: name,
      })
    }
  } catch (e) {
    error = e
  }

  return { result, error }
}

export { auth, db, firestore, googleAuthProvider, signOut, signUp, storage }
