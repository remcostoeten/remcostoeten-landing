"use client";
import NewProjectSidebar from "@/components/layout/NewProjectSidebar.tsx";
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="overflow-hidde ml-4 flex h-screen sm:mt-[70px]">
        <NewProjectSidebar />
        <Aside />
        <main className="flex w-full flex-col  px-4 ">{children}</main>
      </div>
    </>
  );
}
