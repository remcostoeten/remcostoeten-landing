import React, { useEffect, useState } from "react"

import { useAuth } from "@/core/lib/database/auth"
import { getUserData } from "@/app/(dashboard)/finance/data/getData"

function MyComponent({ userId }) {
  const [data, setData] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          console.log("Fetching data...")
          const result = await getUserData(user.uid, "users", "debt")
          console.log("Data fetched:", result)
          setData(result)
        } catch (error) {
          console.error("Error getting user data:", error)
        }
      }

      console.log("Running effect for userId:", user.uid)
      fetchData()
    }
  }, [userId])

  return (
    <div>
      <h1>User Data</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  )
}

export default MyComponent
