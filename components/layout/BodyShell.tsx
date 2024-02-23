"use client"

import { usePathname } from "next/navigation"

import { fontSora } from "@/core/lib/fonts"
import { cn } from "@/core/lib/utils"

type BodyShellProps = {
  children: React.ReactNode
}

export default function BodyShell({ children, ...rest }: BodyShellProps) {
  const pathname = usePathname()

  const commonStyles = "overflow-y-hidden min-h-screen font-sans antialiased"

  const portfolioBody = () => (
    <body
      className={cn(
        commonStyles,
        "body-gradient min-h-screen bg-background",
        fontSora.variable
      )}
      {...rest}
    >
      {children}
    </body>
  )

  const dashboardBody = () => (
    <body className={cn(commonStyles, fontSora.variable)} {...rest}>
      {children}
    </body>
  )

  return pathname.includes("/dashboard") ? dashboardBody() : portfolioBody()
}
