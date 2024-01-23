import MobileNavigation from "@c/core/MobileNavigation"

import "@/styles/globals.scss"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import ReduxProvider from "@/core/redux/ReduxProvider"
import { HydrationOverlay } from "@builder.io/react-hydration-overlay"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import NextTopLoader from "nextjs-toploader"

import { siteConfig } from "@/core/config/site"
import { fontSora } from "@/core/lib/fonts"
import { cn } from "@/core/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthUserProvider } from "@/components/kanban/AuthUserProvider"
import { HeroPattern } from "@/components/layout/HeroPattern"
import ShellLayout from "@/components/layout/MainLayoutShell"
import SiteHeader from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
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
          <html lang="en" suppressHydrationWarning>
            <head />
            <link rel="canonical" href={siteConfig.url} />
            <TooltipProvider>
              <body
                className={cn(
                  " min-h-screen  overflow-x-hidden font-sans antialiased",
                  fontSora.variable
                )}
              >
                {/* <body
              className={cn(
                "body-gradient min-h-screen overflow-x-hidden bg-background font-sans antialiased",wwwwwwwwwwwwwww
                fontSora.variable
              )}
            > */}
                <MobileNavigation />
                <HeroPattern />

                <NextTopLoader color="#2dd4bf" height={5} />
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                >
                  <ShellLayout header={<SiteHeader />}>
                    <div className="transition-all duration-300 sm:max-w-[854px]">
                      {children}
                    </div>
                  </ShellLayout>
                  <TailwindIndicator />
                </ThemeProvider>
                <SpeedInsights />
                <Analytics />
              </body>
            </TooltipProvider>
          </html>
        </ReduxProvider>
      </AuthUserProvider>
    </HydrationOverlay>
  )
}
