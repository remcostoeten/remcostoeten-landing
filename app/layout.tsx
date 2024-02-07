import MobileNavigation from "@c/core/MobileNavigation"

import "@/styles/globals.css"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import ReduxProvider from "@/core/redux/ReduxProvider"
import { HydrationOverlay } from "@builder.io/react-hydration-overlay"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import NextTopLoader from "nextjs-toploader"
import { Toaster } from "sonner"

import { siteConfig } from "@/core/config/site"
import { TooltipProvider } from "@/components/ui/tooltip"
import BackgroundGradientEffect from "@/components/core/BackgroundGradientEffect"
import SiteHeader from "@/components/core/SiteHeader"
import { AuthUserProvider } from "@/components/kanban/AuthUserProvider"
import BodyShell from "@/components/layout/BodyShell"
import { ThemeProvider } from "@/components/theme-provider"
import { ApolloProvider } from '@apollo/client';
import ApolloWrapper from "@/core/database/ApolloWrapper";

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
    <ApolloWrapper>
      <HydrationOverlay>
        <AuthUserProvider>
          <ReduxProvider>
            <html lang="en" suppressHydrationWarning>
              <head />
              <link rel="canonical" href={siteConfig.url} />
              <TooltipProvider>
                {/* <body
                className={cn(
                  " min-h-screen  overflow-x-hidden font-sans antialiased",
                  fontSora.variable
                )}
              > */}
                <body
                  className={cn(
                    " min-h-screen overflow-x-hidden  font-sans antialiased",
                    fontSora.variable
                  )}
                >
                  <MobileNavigation />
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
    </ApolloWrapper>

  )
}
