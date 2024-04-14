"use client";

import "./styles/app.css";
import ApolloWrapper from "@/core/database/ApolloWrapper";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";

import { siteConfig } from "@/core/config/site";
import { fontSora } from "@/core/lib/fonts";
import { cn } from "@/core/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteHeader from "@/components/core/SiteHeader";
import InProgressToast from "@/components/effects/InProgressToast";
import ShellLayout from "@/components/layout/MainLayoutShell";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthUserProvider } from "@/components/AuthUserProvider";
import SubHeader from "@/components/core/MobileNavigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "@/components/core/Link";
import AnimatedElement from "@/components/effects/AnimatedElement";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

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
                <SubHeader />
                <InProgressToast />
                <NextTopLoader color="#2dd4bf" height={5} showSpinner={false} />
                <ThemeProvider
                  attribute="class"
                  defaultTheme="dark"
                  enableSystem
                >
                  <ShellLayout header={<SiteHeader />}>
                    <div className="transition-all duration-300 sm:max-w-[854px] pb-16">
                      {children}
                      <AnimatedElement
                        opacity={0}
                        duration={0.8}
                        delay={0.65}
                        className="sm:hidden fixed bottom-20 right-2 flex flex-col-reverse items-end gap-2"
                      >
                        <ThemeToggle />
                        <Link
                          className=" mobile--wrapper"
                          href="https://github.com/username"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="theme-toggle"
                          >
                            <Icons.gitHub width={16} />
                          </Button>
                        </Link>
                        <Link
                          className=" mobile--wrapper"
                          href="mailto:email@example.com"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="theme-toggle "
                          >
                            <Icons.mail width={16} />
                          </Button>
                        </Link>
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
