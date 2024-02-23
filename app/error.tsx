"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="error flex flex-col gap-2 p-4">
      <h2 className="text-red-500">Something went wrong!</h2>
      <pre
        className="w-fit flex flex-wrap bg-gray-200/4 border border-slate-800/60 p-6"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {error.message}
      </pre>
      <Button variant="destructive" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  )
}
