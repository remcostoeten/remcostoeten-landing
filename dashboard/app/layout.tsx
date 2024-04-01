import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import Providers from "@/components/layout/providers";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HydrationOverlay>
      <html lang="en" suppressHydrationWarning>
        <TooltipProvider>
          <body className={`${inter.className} overflow-hidden`}>
            <NextTopLoader color="#2dd4bf" />
            <Providers>
              <Toaster />
              {children}
            </Providers>
          </body>
        </TooltipProvider>
      </html>
    </HydrationOverlay>
  );
}
