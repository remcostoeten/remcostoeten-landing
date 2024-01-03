import "@/styles/globals.css"
import { Metadata } from "next"
import { HydrationOverlay } from "@builder.io/react-hydration-overlay"
import NextTopLoader from "nextjs-toploader"

import { LayoutProps } from "@/core/types/global"
import { siteConfig } from "@/core/config/site"
import { fontSans } from "@/core/lib/fonts"
import { cn } from "@/core/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import ShellLayout from "@/components/layout/MainLayoutShell"
import SiteHeader from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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

export default async function RootLayout({ children }: LayoutProps) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <HydrationOverlay>
      <html lang="en" suppressHydrationWarning>
        <head />
        <TooltipProvider>
          <body
            className={cn(
              "body-gradient min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            <NextTopLoader color="#2dd4bf" height={5} />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ShellLayout header={<SiteHeader />}>
                <nav className="nav container">
                  <h1 className="text-display-3">KindeAuth</h1>
                  <div>
                    {!(await isAuthenticated()) ? (
                      <>
                        <LoginLink className="btn btn-ghost sign-in-btn">
                          Sign in
                        </LoginLink>
                        <RegisterLink className="btn btn-dark">Sign up</RegisterLink>
                      </>
                    ) : (
                      <div className="profile-blob">
                        {user?.picture ? (
                          <img
                            className="avatar"
                            src={user?.picture}
                            alt="user profile avatar"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="avatar">
                            {user?.given_name?.[0]}
                            {user?.family_name?.[0]}
                          </div>
                        )}
                        <div>
                          <p className="text-heading-2">
                            {user?.given_name} {user?.family_name}
                          </p>

                          <LogoutLink className="text-subtle">Log out</LogoutLink>
                        </div>
                      </div>
                    )}
                  </div>
                </nav>
                <div className="max-w-[854px] transition-all duration-300">
                  {children}
                </div>
                <Toaster />
              </ShellLayout>
              <TailwindIndicator />
            </ThemeProvider>
          </body>
        </TooltipProvider>
      </html>
    </HydrationOverlay>
  )
}
