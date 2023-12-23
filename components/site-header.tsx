import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/core/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "./ui/badge";
import { ChevronRightIcon } from "lucide-react";

const navigationMenu = [
  { label: "Home", icon: Icons.home },
  // { label: "Dashboard", icon: Icons.layoutGrid },
  // { label: "Projects", icon: Icons.code },
  { label: "Blog", icon: Icons.code },
  // { label: "Learn", icon: Icons.lightbulb },
  { label: "About", icon: Icons.user },
  { label: "Contact", icon: Icons.mail },
  // { label: "Guestbook", icon: Icons.code },
  // { label: "Playground", icon: Icons.code },
]


export function SiteHeader() {
  return (
    <aside className="min-h-screen w-64 text-accent ">
      <div className="mb-6 flex items-center space-x-4 ">
        <Image src='/remco-avatar-compressed.webp' alt="Remco Stoeten" width={50} height={50} className="rounded-full" />
        <div>
          <div className="font-bold text-white">Remco Stoeten</div>
          <div className="text-sm text-gray-400">@remcosoeten</div>
        </div>
      </div>
      <div className="mb-6 flex items-center">
        <span className="animation-pulser mr-2 h-2 w-2 rounded-full bg-green-400" />
        <span className="ml-2 text-sm">Open for collabs!</span>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
      <nav className="mb-6">
        <ul>
          {navigationMenu.map((navItem, index) => (
            <li key={index} className=" mb-4 flex items-center text-accent">
              {navItem.icon && <navItem.icon className="mr-2" />}
              <span>{navItem.label}</span>
              {index < navigationMenu.length - 1 && <ChevronRightIcon className="ml-auto" />}
            </li>
          ))}
        </ul>
      </nav>
      <div className="mb-6 flex items-center justify-start">
        <Icons.terminal className="mr-2" />
        <span className="grow">cmd + k</span>
        <Badge variant="secondary">AI Powered</Badge>
      </div>
      <div className="mb-6 flex items-center">
        <span className="ml-2">with ❤ by remco stoeten</span>
      </div>
    </aside>
  );
}
