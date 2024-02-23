"use client"

import { useEffect, useState } from "react"
import { auth, db } from "@/core/database/firebase"
import { addDoc, collection, doc, getDocs } from "firebase/firestore"
import { toast } from "sonner"

interface Field {
  label: string
  name: string
  type?: string
  options?: Array<{ value: string; label: string }>
}

interface FirestoreFormProps {
  initialState: Record<string, any>
  collectionRef: string
  fields: Field[]
}

export const useFirestoreForm = (
  initialState: Record<string, any>,
  collectionRef: string,
  fields: Field[]
) => {
  const [state, setState] = useState(initialState)
  const user = auth.currentUser

  const handleChange = (field: string, value: any) => {
    setState({ ...state, [field]: value })
  }

  const fetchOptions = async (fieldName) => {
    const field = fields.find((f) => f.name === fieldName)
    if (field && field.type === "select") {
      const snapshot = await getDocs(collection(db, "departments"))
      const departments = snapshot.docs.map((doc) => doc.data())
      field.options = departments.map((department) => ({
        value: department.name,
        label: department.name,
      }))
    }
  }

  useEffect(() => {
    fetchOptions("nameOfDept")
  }, [])

  const handleSubmit = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid)
      const collectionRefForUser = collection(userDocRef, collectionRef)

      try {
        await addDoc(collectionRefForUser, state)
        toast(`Data has been added`)
      } catch (error) {
        toast("Something went wrong")
      }
    }
  }

  return { state, handleChange, handleSubmit, fields }
}
