import NewProjectSidebar from "@/components/layout/NewProjectSidebar.tsx";
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidde sm:mt-[70px]">
        <Aside />
        {/* <NewProjectSidebar /> */}
        <main className="w-full pt-16">{children}</main>
      </div>
    </>
  );
}
