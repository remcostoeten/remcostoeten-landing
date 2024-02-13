'use client';
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import Wrapper from "./Wrapper";

export default function NewProjectSidebar() {
    const projects: any[] = [];

    return (
        <Wrapper padding="small" isEmpty className='w-2/6 flex flex-col justify-between'>
            {projects.length > 0 ? (
                projects.map((project, index) => (
                    <div key={index}>{project}</div>
                ))
            ) : (
                <h2 className="text-dark text-sm  text-center">Your snippets will be listed here</h2>
            )}
            <Button className='text-sm' variant='ghost'><PlusIcon /> New Snippet</Button>
        </Wrapper>
    );
}