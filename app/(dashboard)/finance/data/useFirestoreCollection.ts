import { useEffect, useState } from "react"
import { collection, getDocs, getFirestore, query } from "firebase/firestore"

const useFirestoreCollection = (db, collectionPath) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const collectionRef = collection(db, collectionPath)
        const querySnapshot = await getDocs(query(collectionRef))

        const dataArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setData(dataArray)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [db, collectionPath])

  return { data, loading, error }
}

export default useFirestoreCollection
