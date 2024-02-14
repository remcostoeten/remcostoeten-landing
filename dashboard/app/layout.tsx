'use client';
import Providers from "@/components/layout/providers";
import "@uploadthing/react/styles.css";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <TooltipProvider>
        <body className={`${inter.className} overflow-hidden`}>
          <Providers>
            <Toaster />
            {children}
          </Providers>
        </body>
      </TooltipProvider>
    </html >
  );
}