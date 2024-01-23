"use client"

import { useEffect, useState } from "react"
import { storage } from "@/core/database/firebase"
import { getAuth, updateProfile } from "firebase/auth"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AvatarUploadShell() {
  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null)

  const [userProfilePicture, setUserProfilePicture] = useState("")
  const auth = getAuth()
  const user = auth ? auth.currentUser : null

  useEffect(() => {
    if (auth.currentUser) {
      setUserProfilePicture(auth.currentUser?.photoURL as any)
      setName(auth.currentUser?.displayName || "")
    }
  }, [auth.currentUser])

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault()

    if (auth.currentUser) {
      if (avatar) {
        const avatarRef = ref(storage, `avatars/${auth.currentUser.uid}`)
        await uploadBytes(avatarRef, avatar)
        const downloadURL = await getDownloadURL(avatarRef)

        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: downloadURL,
        })
      } else {
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
      }

      toast("Profile updated")

      const updatedUser = getAuth().currentUser
      if (updatedUser) {
        setName(updatedUser.displayName || "")
        setUserProfilePicture(updatedUser.photoURL as any)
      }
      document.dispatchEvent(new CustomEvent("userUpdated"))
    }
  }

  useEffect(() => {
    if (auth.currentUser) {
      setUserProfilePicture(auth.currentUser?.photoURL || null)
      setName(auth.currentUser?.displayName || "")
    }
  }, [auth.currentUser])

  const username = name || auth.currentUser?.displayName || ""

  return (
    <div className="grid gap-8 pt-8">
      <div className="flex flex-col ">
        <Avatar className="h-24 w-24 cursor-move border-dashed border-4 border-gray-300 mb-4">
          <AvatarImage src={user?.photoURL} />
          <AvatarFallback> {user?.displayName?.[0]}</AvatarFallback>
        </Avatar>
      </div>
      <Label htmlFor="avatar">Upload Avatar</Label>
      <Input
        id="avatar"
        name="avatar"
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setAvatar(e.target.files[0])
          } else {
            setAvatar(null)
          }
        }}
      />
      <form className="mt-4 space-y-2" onSubmit={handleForm}>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder={username}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Button type="submit" variant="outline"></Button>
      </form>
      <div className="space-y-2">
        <Label htmlFor="display-name">Display Name</Label>
        <Input id="display-name" placeholder="Enter your display name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          disabled
          id="email"
          placeholder="Enter your email"
          type="email"
        />
      </div>
      <CardFooter className="flex justify-between">
        <Button variant="destructive">Delete account</Button>
        <Button>Save</Button>
      </CardFooter>
    </div>
  )
}
