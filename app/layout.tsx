// RootLayout.tsx
import React, { useEffect } from "react"
import { Metadata } from "next/types"
import ReduxProvider from "@/core/redux/ReduxProvider"
import { HydrationOverlay } from "@builder.io/react-hydration-overlay"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import NextTopLoader from "nextjs-toploader"
import { Toaster } from "sonner"

import { siteConfig } from "@/core/config/site"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthUserProvider } from "@/components/kanban/AuthUserProvider"
import BodyShell from "@/components/layout/BodyShell"
import { ThemeProvider } from "@/components/theme-provider"

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <HydrationOverlay>
      <AuthUserProvider>
        <ReduxProvider>
          <TooltipProvider>
            <html lang="en" suppressHydrationWarning>
              <head />
              <link rel="canonical" href={siteConfig.url} />
              <TooltipProvider>
                <BodyShell>
                  <NextTopLoader color="#2dd4bf" height={5} />
                  <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                  >
                    {children}
                    <Toaster invert className="tex-[30px]" />
                  </ThemeProvider>
                  <SpeedInsights />
                  <Analytics />
                </BodyShell>
              </TooltipProvider>
            </html>
          </TooltipProvider>
        </ReduxProvider>
      </AuthUserProvider>
    </HydrationOverlay>
  )
}
