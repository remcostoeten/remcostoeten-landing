import React from "react"
import Link from "next/link"

import { TooltipProvider } from "@/components/ui/tooltip"

export default function DashboardLayout({ children }) {
  return (
    <>
      <TooltipProvider>
        <header className="w-screen mt-8 fixed top-0 left-0 h-8 bg-red-400 mb-4">
          <Link href="/">home</Link>
          <Link href="about">about</Link>
        </header>
        <div className="flex ">
          <aside className="bg-red-400 w-1/66 min-h-screen">
            <></>
          </aside>
          <main className="w-5/66 min-h-screen">{children}</main>
        </div>
      </TooltipProvider>
    </>
  )
}
