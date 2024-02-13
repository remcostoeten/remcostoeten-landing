'use client';
import { cn } from "@/core/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./UserNav";
import Logo from "../theme/logo";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Logo />
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
