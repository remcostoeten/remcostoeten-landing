import React from "react"

interface ShellLayoutProps {
  children?: any
  header?: any
}

export default function ShellLayout({ children, header }: ShellLayoutProps) {
  return (
    <div className="dark:text-darkTextl mx-auto flex max-w-[1440px] lg:px-8">
      <aside className="hidden w-[25%] p-8 sm:block">{header}</aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
