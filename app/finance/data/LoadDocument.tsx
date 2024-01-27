import { getFirestore, doc, DocumentSnapshot, collection } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

const YourComponent: React.FC = () => {
    const db = getFirestore()

    const [snapshot, loading, error] = useDocument(
        doc(db, "debt", "35ITIzZJKmz5vzEos7Kw")
    )

    if (error) {
        return <strong>Error: {JSON.stringify(error)}</strong>
    }

    if (loading) {
        return <span>Loading...</span>
    }

    if (snapshot) {
        return <div>{JSON.stringify(snapshot.data())}</div>
    }

    return null
}

/**
 * Loads a individual Firestore document and renders it.
 *
 * A document is a single entry which can contain fields. For mapping over a group, use LoadCollection.tsx
 *
 * @param docRef - Reference to the document to load.
 * @returns The loaded document snapshot.
 *
 * @example
 *
 * const db = getFirestore()
 *
 * const docRef = doc(db, "users", "1234")
 *
 * function UserPage() {
 *   const [userSnapshot] = useDocument(docRef)
 *
 *   if (!userSnapshot) {
 *     return <p>Loading...</p>
 *   }
 *
 *   return <p>{userSnapshot.data().name}</p>
 * }
 */