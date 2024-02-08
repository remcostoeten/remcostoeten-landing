import ReduxProvider from "@/core/redux/ReduxProvider"
import { toast } from "sonner"

import { fontSora } from "@/core/lib/fonts"
import { cn } from "@/core/lib/utils"
import SiteHeader from "@/components/core/SiteHeader"
import { AuthUserProvider } from "@/components/kanban/AuthUserProvider"
import ShellLayout from "@/components/layout/MainLayoutShell"
import { TailwindIndicator } from "@/components/tailwind-indicator"

import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import NextTopLoader from "nextjs-toploader"

import { ThemeProvider } from "@/components/kanban/ThemeProvider"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthUserProvider>
      <ReduxProvider>
        <TooltipProvider>
          <div
            className={cn(
              "body-gradient min-h-screen overflow-x-hidden bg-background font-sans antialiased",
              fontSora.variable
            )}
          >
            <NextTopLoader color="#2dd4bf" height={5} />
            <ThemeProvider>
              <ShellLayout header={<SiteHeader />}>
                <div className="transition-all duration-300 sm:max-w-[854px]">
                  <Component {...pageProps} />
                </div>
              </ShellLayout>
              <TailwindIndicator />
            </ThemeProvider>
            <SpeedInsights />
            <Analytics />
          </div>
        </TooltipProvider>
      </ReduxProvider>
    </AuthUserProvider>
  )
}
