
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type GuestbookCommentsProps = {
  avatarSrc: string
  avatarFallback: string
  nameHandle: string
  date: string
  message: string
  country: string
  intro?: string
  onDelete?: () => void
  onReply?: () => void
}

export default function Component({
  avatarSrc,
  avatarFallback,
  nameHandle,
  date,
  message,
  country,
  intro,
  onDelete,
  onReply,
}: GuestbookCommentsProps) {
  return (
    <div key="1" className="space-y-8">
      {intro}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 border">
            <AvatarImage alt={avatarFallback} src={avatarSrc} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="font-semibold">
                {nameHandle}
                <span className="font-light"> from {country}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {date}
              </div>

              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger>:</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      {" "}
                      <Button className="h-8 w-8" size="icon" variant="ghost">
                        <FileEditIcon className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button
                        className="h-8 w-8"
                        size="icon"
                        variant="ghost"
                        onClick={onDelete}
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {" "}
                      <Button className="h-8 w-8" size="icon" variant="ghost">
                        <StarIcon className="h-4 w-4" />
                        <span className="sr-only">Favourite</span>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {" "}
                      <Button
                        className="h-8 w-8"
                        size="icon"
                        variant="ghost"
                        onClick={onReply}
                      >
                        <FileEditIcon className="h-4 w-4" />
                        <span className="sr-only">Reply</span>
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        <div>{message}</div>{" "}
      </div>
      {/* <AdminReply /> */}
    </div>
  )
}

function FileEditIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  )
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
=======
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
type GuestbookCommentsProps = {
    avatarSrc: string
    avatarFallback: string
    nameHandle: string
    date: string
    message: string
    country: string
    intro?: string
    onDelete?: () => void
    onReply?: () => void
}

export default function Component({ avatarSrc,
    avatarFallback,
    nameHandle,
    date,
    message,
    country,
    intro,
    onDelete, onReply
}: GuestbookCommentsProps) {
    return (
        <div key="1" className="space-y-8">
            {intro}
            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage alt={avatarFallback} src={avatarSrc} />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1.5">
                        <div className="flex w-full items-center justify-between gap-2">
                            <div className="font-semibold">{nameHandle}<span className="font-light"> from {country}</span></div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{date}</div>

                            <div className="flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>:</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem> <Button className="h-8 w-8" size="icon" variant="ghost">
                                            <FileEditIcon className="h-4 w-4" />
                                            <span className="sr-only">Edit</span>
                                        </Button></DropdownMenuItem>
                                        <DropdownMenuItem><Button className="h-8 w-8" size="icon" variant="ghost" onClick={onDelete}>
                                            <TrashIcon className="h-4 w-4" />
                                            <span className="sr-only">Delete</span>
                                        </Button></DropdownMenuItem>
                                        <DropdownMenuItem> <Button className="h-8 w-8" size="icon" variant="ghost">
                                            <StarIcon className="h-4 w-4" />
                                            <span className="sr-only">Favourite</span>
                                        </Button></DropdownMenuItem>
                                        <DropdownMenuItem> <Button className="h-8 w-8" size="icon" variant="ghost" onClick={onReply}>
                                            <FileEditIcon className="h-4 w-4" />
                                            <span className="sr-only">Reply</span>
                                        </Button></DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>




                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    {message}
                </div> </div>
            {/* <AdminReply /> */}
        </div>
    )
}

function FileEditIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
        </svg>
    )
}


function StarIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}


function TrashIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    )
}   
