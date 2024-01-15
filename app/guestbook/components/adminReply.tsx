import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminReply() {
  return (
    <>
      <div className="ml-8 flex items-start gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
        <Avatar className="h-10 w-10 border">
          <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="grid gap-1.5">
          <div className="flex items-center gap-2">
            <div className="font-semibold">@admin</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              4 months ago
            </div>
          </div>
          <div>
            Thank you for your kind words! Were always working to improve our
            ecosystem.
          </div>
        </div>
      </div>
    </>
  )
}
