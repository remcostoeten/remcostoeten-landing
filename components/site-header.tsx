import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChevronRightIcon } from "lucide-react";
import CommandPrompt from "./menu/CommandPrompt";
import LoginLink from "./menu/LoginLink";

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
    <aside className="flex min-h-screen flex-col  text-accent">
      <div className="flex flex-col gap-2.5 text-xl ">
        <Image src='/remco-avatar-compressed.webp' alt="Remco Stoeten" width={50} height={50} className="rounded-full" />
        <div className="">
          <div className="font-bold text-white">Remco Stoeten</div>
          <div className="text-sm text-gray-400">@remcosoeten</div>
        </div>
      </div>
      <div className="mb-6 flex grow flex-col ">
        <div className="mb-6 flex items-center">
          <span className="work-pulse pulser mr-2 h-2 w-2 rounded-full bg-green-400" />
          <span className="text-sm">Open for collabs!</span>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
        <ul className="grow">
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
          <LoginLink />
        </ul>
      </div>

      {/* <CommandPrompt /> */}
      <p className="mb-6 flex items-center">
        With ❤ by remco stoeten
      </p>
    </aside>
  );
}
