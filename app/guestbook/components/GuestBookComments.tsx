import { Trash2Icon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Seperator from "components/layout/Seperator";
import 'firebase/auth';
import 'firebase/firestore';

import "firebase/auth"

import "firebase/firestore"



type GuestbookCommentsProps = {
  avatarSrc: string
  avatarFallback: string
  nameHandle: string
  date: string
  message: string
  country: string
  deleteComment?: () => void
  user?: string | null
}

export default function GuestBookComments({
  avatarSrc,
  avatarFallback,
  nameHandle,
  date,
  message,
  deleteComment,
  country,
  user,
}: GuestbookCommentsProps & { user: string | null }) {
  return (
    <>
      <div className="grid gap-6">
        <div className="flex items-start gap-4 text-sm">
          <Avatar className="h-10 w-10 border">
            <AvatarImage alt={avatarFallback} src={avatarSrc} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <div>
                <div className="flex flex-col">
                  <div className="font-semibold">
                    {nameHandle}{" "}
                    <span className="ml-2 text-xs font-light">from</span>{" "}
                    {country}
                    {nameHandle} <span className="ml-2 text-xs font-light">from</span> {country}
                  </div>
                  <time className="text-xs text-gray-500 dark:text-gray-400">
                    {date}
                  </time>
                </div>
                <div>{message}</div>
              </div>

              {deleteComment && (
                <button>
                  <Trash2Icon />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Seperator />
    </>
  )
}
