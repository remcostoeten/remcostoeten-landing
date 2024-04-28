"use client";
import "./styles/app.css";
import { AuthUserProvider } from "@/components/AuthUserProvider";
import EffectMenu from "@/components/Header/EffectMenu";
import ShellLayout from "@/components/core/layout/MainLayoutShell";
import AnimatedElement from "@/components/effects/AnimatedElement";
import InProgressToast from "@/components/effects/InProgressToast";
import SiteHeader from "@/components/effects/SiteHeader";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/core/config/site";
import ApolloWrapper from "@/core/database/ApolloWrapper";
import { fontSora } from "@/core/lib/fonts";
import { cn } from "@/core/lib/utils";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon-16x16.png",
//     apple: "/apple-touch-icon.png",
//   },
// }

export default function RootLayout({ children }) {
    return (
        <ApolloWrapper>
            <HydrationOverlay>
                <AuthUserProvider>
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
                                    " min-h-screen overflow-x-hidden  font-sans antialiased pb-16 mb-8",
                                    fontSora.variable
                                )}
                            >
                                <InProgressToast />
                                <NextTopLoader color="#2dd4bf" height={5} showSpinner={false} />
                                <ThemeProvider
                                    attribute="class"
                                    defaultTheme="dark"
                                    enableSystem
                                >
                                    <EffectMenu />
                                    <ShellLayout header={<SiteHeader />}>
                                        <div className="transition-all duration-300 sm:max-w-[854px] pb-16">
                                            {children}
                                            <AnimatedElement
                                                opacity={0}
                                                duration={0.8}
                                                delay={0.65}
                                                className=" fixed bottom-20 right-2 flex flex-col-reverse items-end gap-2"
                                            >
                                                <ThemeToggle />
                                            </AnimatedElement>
                                        </div>
                                    </ShellLayout>
                                </ThemeProvider>
                                <SpeedInsights />
                                <Analytics />
                            </body>
                        </TooltipProvider>
                    </html>
                </AuthUserProvider>
            </HydrationOverlay>
        </ApolloWrapper>
    );
}
