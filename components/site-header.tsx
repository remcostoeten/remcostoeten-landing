import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChevronRightIcon } from "lucide-react";
import CommandPrompt from "./menu/CommandPrompt";

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
    <aside className="min-h-screen text-accent ">
      <div className="mb-6 flex flex-col gap-2 ">
        <Image src='/remco-avatar-compressed.webp' alt="Remco Stoeten" width={50} height={50} className="rounded-full" />
        <div>
          <div className="font-bold text-white">Remco Stoeten</div>
          <div className="text-sm text-gray-400">@remcosoeten</div>
        </div>
      </div>
      <div className="mb-6 flex items-center">
        <span className="work-pulse pulser mr-2 h-2 w-2 rounded-full bg-green-400" />
        <span className="text-sm">Open for collabs!</span>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
      <ul>
        {navigationMenu.map((navItem, index) => (
          <Link key={index} className="mb-4 flex items-center text-accent"
            href={navItem.label === "Home" ? "/" : `/${navItem.label.toLowerCase()}`}>
            <>
              {navItem.icon && <navItem.icon className="mr-2" />}
              <span>{navItem.label}</span>
              {index < navigationMenu.length - 1 && <ChevronRightIcon className="ml-auto" />}
            </>
          </Link>
        ))}
      </ul>
      {/* <CommandPrompt /> */}
      <p className="mb-6 flex items-center">
        with ❤ by remco stoeten
      </p>
    </aside>
  );
}