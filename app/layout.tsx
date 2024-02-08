import MobileNavigation from "@c/core/MobileNavigation"

import "../styles/globals.scss"
import React from "react"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { SpeedInsights } from "@vercel/speed-insights/next"
import NextTopLoader from "nextjs-toploader"

import {
    Analytics,
    ApolloWrapper,
    AuthUserProvider,
    ReduxProvider,
    TailwindIndicator,
    ThemeProvider,
    cn,
    fontSora,
    siteConfig,
} from "@/core/config/site_helpers_metrics"
import {
    ShellLayout,
    SiteHeader,
    TooltipProvider,
} from "@/components/ui/ui-imports"

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
        </ApolloWrapper>
    )
}
