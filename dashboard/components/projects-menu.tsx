'use client';
import { useState } from "react";
import { FileIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Wrapper from "./layout/Wrapper";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Icons } from "./theme/icons";
import Seperator from "./ui/Seperator";
import { CategoriesList } from "./snippets/FetchSnippet";
import { useFirestoreCollection } from "@/hooks/useGetFirestoreData";

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

  const { data: categories, loading, error } = useFirestoreCollection<Category>('categories'); // replace 'categories' with your actual collection name

  const pathname = usePathname().toLowerCase();

  if (loading) {
    return <div>Loading...</div>; // replace with your loading component
  }

  if (error) {
    return <div>Error: {error.message}</div>; // replace with your error component
  }
  // return (
  //   <Wrapper horizontalPadding="0" isEmpty padding="none" className="text-white">
  //     <h2 className="text-lg text-grey font-medium tracking-wide">All snippet</h2>
  //     <Seperator spacingTop="10" spacingBottom="10" />
  //     <CategoriesList />
  //     {projects.map((project, index) => (
  //       <React.Fragment key={index}>
  //         <div className={`bg-grey-light px-4 py-[6px] lg:pt-2 rounded-lg flex justify-between ${index === 0 ? '' : 'mt-2 '}`}>
  //           <h3 className="text-sm font-medium">{project.name}</h3>
  //           <CrudOperation />
  //         </div>
  //         <div className={`flex flex-col gap-2 ${project.files.length > 0 ? '!mt-2' : ''} hover:file-hover--text`}>
  //           {project.files.map((file, fileIndex) => (
  //             <div key={fileIndex} className="flex justify-between items-center">
  //               <div className="flex items-center gap-2">
  //                 <FileIcon />
  //                 <p className="text-sm">{file}</p>
  //               </div>
  //               <CrudOperation />
  //             </div>
  //           ))}
  //         </div>
  //       </React.Fragment>
  //     ))}
  //   </Wrapper>
  // );


  return (
    <Wrapper horizontalPadding="0" isEmpty padding="none" className="text-white">
      <h2 className="text-lg text-grey font-medium tracking-wide">All snippet</h2>
      <Seperator spacingTop="10" spacingBottom="10" />
      <CategoriesList />
      {categories.map((category, index) => (
        <React.Fragment key={index}>
          <div className={`bg-grey-light px-4 py-[6px] lg:pt-2 rounded-lg flex justify-between ${index === 0 ? '' : 'mt-2 '}`}>
            <h3 className="text-sm font-medium">{category.name}</h3>
            <p className="text-sm">{category.description}</p>
            <CrudOperation />
          </div>
        </React.Fragment>
      ))}
    </Wrapper>
  );

  function CrudOperation() {
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <DropdownMenuLabel className="p-0"><Icons.MoreDots className="p-0 rotate-90 " /></DropdownMenuLabel>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-xs font-medium text-grey-dark">Rename</DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-medium text-grey-dark">Folder</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs font-medium text-grey-dark flex gap-2">
              <Icons.Danger width={20} fill='white' className="mr-8 text-white" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
}