import { FileIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Wrapper from "./layout/Wrapper";
import { usePathname } from "next/navigation";


export function ProjectsMenu() {
  const projects = [
    {
      name: "Project",
      files: [
        "lib.rs",
        "another.rs",
        "filetwo.rs"
      ]
    },
  ];


  const pathname = usePathname();

  return (
    <Wrapper horizontalPadding="0" isEmpty padding="none" className="text-white p-4 space-y-4">
      <h2 className="text-xl text-grey font-medium tracking-wide">All projects</h2>
      <hr></hr>
      {projects.map((project, index) => (
        <div key={index}>
          <div className="bg-grey-light px-4 py-2 rounded-lg">
            <h3 className="text-sm font-medium">{project.name}</h3>
          </div>
          <div className="space-y-2 mt-2">
            {project.files.map((file, fileIndex) => (
              <div className="flex items-center space-x-3" key={fileIndex}>
                <FileIcon width='15' className="text-gray-400" />
                <span>{file}</span>
              </div>
            ))}
            <ParentProject projectName={project.name} isActive={pathname === `/${project.name}`} />
          </div>
        </div>
      ))}
    </Wrapper>
  );
}

function ParentProject({ projectName, isActive }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <FileIcon className={isActive ? 'text-blue-500' : 'text-gray-400'} />
        <span>{projectName}</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}