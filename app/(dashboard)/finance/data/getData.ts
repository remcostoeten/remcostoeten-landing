import { db } from "@/core/database/firebase"
import { collection, getDocs } from "firebase/firestore"

export async function getUserData(
  userId: string,
  collectionName: string,
  subCollectionName: string
) {
  const colRef = collection(db, collectionName, userId, subCollectionName)
  const querySnapshot = await getDocs(colRef)
  const docs = querySnapshot.docs.map((doc) => doc.data())

  return docs
}
