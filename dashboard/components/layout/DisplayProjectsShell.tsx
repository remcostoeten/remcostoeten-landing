import { Button } from "../ui/button";
import NewSnippet from "../snippets/NewSnippet";
import NewProjectForm from "../forms/NewProjectForm";
import { Icons } from "../theme/icons";

export default function DisplayProjectsShell() {
  return (
    <>
      <div className="full-height grid place-items-center">
        <div className="flex flex-1 flex-col items-center justify-center">
          <Icons.Folder className="mb-4 size-24 text-gray-600" />
          <p className="mb-4 text-center text-xl font-medium text-gray-400">
            No Projects yet.
            <br />
            Create your first project.
          </p>
          <NewSnippet
            trigger={
              <Button variant="outline" className=" text-white">
                + New Project
              </Button>
            }
            title="Create a new project"
          >
            <NewProjectForm regularForm />
          </NewSnippet>
        </div>
      </div>
    </>
  );
}
