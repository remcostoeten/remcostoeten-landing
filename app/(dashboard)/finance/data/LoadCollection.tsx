import { firestore } from "firebase-admin"
import { QuerySnapshot, collection, getFirestore } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"

import { MiniSpinner } from "@/components/effects/Spinner"

const YourComponent: React.FC = () => {
  const db = getFirestore()

  const [snapshot, loading, error] = useCollection(collection(db, "debt"))

  if (error) {
    return <strong>Error: {JSON.stringify(error)}</strong>
  }

  if (loading) {
    return <MiniSpinner />
  }

  if (snapshot) {
    return (
      <div>
        {snapshot.docs.map((doc) => (
          <div key={doc.id}> {JSON.stringify(doc.data())} </div>
        ))}
      </div>
    )
  }
}
