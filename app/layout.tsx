import "@/styles/globals.css";
import { Metadata } from "next";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import NextTopLoader from 'nextjs-toploader';

import { siteConfig } from "@/core/config/site";
import { fontSans } from "@/core/lib/fonts";
import { cn } from "@/core/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import ShellLayout from "@/components/layout/shell";
import { LayoutProps } from "@/core/types/global";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <HydrationOverlay>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "body-gradient min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <NextTopLoader color="#2dd4bf" height={5} />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ShellLayout header={<SiteHeader />}>
              <div className="max-w-[854px] transition-all duration-300 lg:w-4/5">{children}</div>
            </ShellLayout>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </HydrationOverlay>
  )
}