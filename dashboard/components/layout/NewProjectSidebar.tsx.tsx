"use client";
import { ProjectsMenu } from "@c/projects-menu";
import { Button } from "../ui/button";
import Wrapper from "./Wrapper";
import NewProjectForm from "@c/forms/NewProjectForm";
import NewSnippet from "@c/snippets/NewSnippet";

export default function NewProjectSidebar() {
  const projects: any[] = [];

  return (
    <Wrapper
      padding="small"
      isEmpty
      className="flex w-2/6 flex-col justify-between"
    >
      <ProjectsMenu />
      {projects.length > 0 ? (
        projects.map((project, index) => <div key={index}>{project}</div>)
      ) : (
        <h2 className="text-dark text-center  text-sm">
          Your snippets will be listed here
        </h2>
      )}

      <NewSnippet
        trigger={
          <Button variant="ghost" className=" text-white">
            + New Snippet
          </Button>
        }
        title="Create a new project"
      >
        <NewProjectForm sidebarForm />
      </NewSnippet>
    </Wrapper>
  );
}
