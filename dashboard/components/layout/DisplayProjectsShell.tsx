import { Button } from "../ui/button";
import NewSnippet from "../snippets/NewSnippet";
import NewProjectForm from "../forms/NewProjectForm";
import { Icons } from "../theme/icons";

export default function DisplayProjectsShell() {
  return (
    <>
      <div className="full-height grid place-items-center">
        <div className="flex-1 flex flex-col items-center justify-center">
          <Icons.Folder className="text-gray-600 h-24 w-24 mb-4" />
          <p className="text-gray-400 text-center mb-4 text-xl font-medium">
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
            children={<NewProjectForm />}
          />
        </div>
      </div>
    </>
  );
}
