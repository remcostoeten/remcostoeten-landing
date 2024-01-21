'use client';
import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { useAppDispatch } from "../redux/store";
import { useProjects } from "../utils";

const useCurMenu = () => {
  const [curMenu, setCurMenu] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  useEffect(() => {
    if (pathname === "/projects") {
      setCurMenu("home");
    }
    if (projectId) {
      setCurMenu(projectId as string);
    }
  }, [pathname, projectId]);
  return curMenu;
};

export const ProjectsLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { projects, loading } = useProjects();
  const curMenu = useCurMenu();

  const projectItemsChildren = useMemo(
    () =>
      projects.map((p) => ({
        label: p.title,
        key: p.id ?? p.title,
        onClick: () => {
          router.push(`/projects/${p.id}`);
        },
      })),
    [projects]
  );

  const projectItems = [
    {
      label: "Home",
      key: "home",
      icon: <AiOutlineHome />,
      onClick: () => {
        router.push("/projects");
      },
    },
    {
      type: "group",
      label: "Projects",
      key: "projects",
      children: projectItemsChildren,
    },
  ];

  return (
    <div className="min-h-screen flex">
      <div className="w-64 border-r">
        {loading ? (
          <div className="mt-20 flex justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {projectItems.map((item) => (
              <div key={item.key} onClick={item.onClick} className={`p-2 rounded ${curMenu === item.key ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
};