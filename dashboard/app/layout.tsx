import Providers from "@/components/layout/providers";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Shadcn",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default async function RootLayout({
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
      </TooltipProvider>    </html >
  );
}
