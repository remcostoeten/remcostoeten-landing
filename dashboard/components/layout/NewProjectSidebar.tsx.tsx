'use client';
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import VisualizeComponent from '@remcostoeten/visualize-component-debugger'

export default function NewProjectSidebar() {
    const projects: any[] = []; // Empty projects array

    return (
        <aside className='sidebar-height w-1/6 p-8 bg-body flex flex-col justify-between'>
            {projects.length > 0 ? (
                projects.map((project, index) => (
                    <div key={index}>{project}</div>
                ))
            ) : (
                <h2 className="text-dark text-xl  text-center">Your projects will be listed here</h2>
            )}
            <VisualizeComponent showAlert>
                <Button className='text-xl' variant='ghost'><PlusIcon /> New project</Button>
            </VisualizeComponent>
        </aside>
    );
}