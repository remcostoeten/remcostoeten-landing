'use client'; import NewProjectSidebar from "@/components/layout/NewProjectSidebar.tsx";
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/header";
import type { Metadata } from "next";
import UserGreeting from "@/components/auth/UserGreeting";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="ml-4 flex h-screen overflow-hidde sm:mt-[70px]">
        <NewProjectSidebar />
        <Aside />
        <main className="w-full flex flex-col ">
          <UserGreeting />
          {children}</main>
      </div>
    </>
  );
}
