"use client";
import { cn } from "@/core/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./UserNav";
import Logo from "../theme/logo";

export default function Header() {
  return (
    <div className="fixed inset-x-0 top-0 z-20">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:block">
          <div className="flex items-center gap-4">
            <Logo />
            {/* <SnippetTitle /> */}
          </div>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
        </div>
      </nav>
    </div>
  );
}
