'use client';
import { useState } from "react";
import { FileIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Wrapper from "./layout/Wrapper";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Icons } from "./theme/icons";

interface Project {
  name: string;
  files: string[];
}

interface ParentProjectProps {
  projectName: string;
  isActive: boolean;
}

function ParentProject({ projectName }: ParentProjectProps) {
  return (
    <Link href="#" className="pl-4 flex items-center space-x-3">
      <FileIcon width="17" className="text-gray-400 hover:text-primary" />
      <span className="text-offwhite" style={{ display: "flex", alignItems: "center" }}>
        {projectName}
      </span>
    </Link>
  );
}

export function ProjectsMenu() {
  const projects: Project[] = [
    {
      name: "Project",
      files: [
        "lib.rs",
        "another.rs",
        "filetwo.rs"
      ],
    },
    {
      name: "Scripts",
      files: [],
    },
    {
      name: "Snippets",
      files: [
        "lib.rs",
        "another.rs",
        "filetwo.rs"
      ],
    },
  ];

  const pathname = usePathname().toLowerCase();

  return (
    <Wrapper horizontalPadding="0" isEmpty padding="none" className="text-white">
      <h2 className="text-lg text-grey font-medium tracking-wide">All projects</h2>
      <hr />
      {projects.map((project, index) => (
        <React.Fragment key={index}>
          <div className={`bg-grey-light px-4 py-[6px] lg:py-2 rounded-lg flex justify-between ${index === 0 ? 'mt-4' : 'mt-'}`}>
            <h3 className="text-sm font-medium">{project.name}</h3>
            <CrudOperation />
          </div>
          <div className="flex flex-col gap-2 !mt-2 hover:file-hover--text">
            {project.files.map((file, fileIndex) => (
              <ParentProject projectName={project.name} isActive={pathname === `/${project.name}`} key={fileIndex} />
            ))}
          </div>
        </React.Fragment>
      ))
      }
    </Wrapper >
  );

  function CrudOperation() {
    return (
      <div className="flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <DropdownMenuLabel className="p-0"><Icons.MoreDots className="p-0 rotate-90 " /></DropdownMenuLabel>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-xs font-medium text-grey-dark">File</DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-medium text-grey-dark">Folder</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs font-medium text-grey-dark">Import</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
}
