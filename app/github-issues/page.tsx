"use client"

import React, { Suspense, useState, useEffect } from "react";
import {
    Table,
    TableBody, TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import TableToolbar from "./compopnents/TableToolbar";
import RowUi from "./compopnents/RowUi";
import { fetchGithubIssues } from "@/core/lib/fetchGithubIssues";
import LabelPill from "./compopnents/LabelPill";



export default function Page() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTerm, setFilterTerm] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getIssues = async () => {
            const issues = await fetchGithubIssues();
            setTasks(issues);
        };

        getIssues();
    }, []);

    console.log(tasks)

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleFilter = (term) => {
        setFilterTerm(term);
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        task.status.toLowerCase().includes(filterTerm.toLowerCase())
    );

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex flex-col gap-4">
                <TableToolbar onSearch={handleSearch} onFilter={handleFilter} />
                <Table
                    key="1"
                    className="divide-y divide-gray-900 !rounded-md border text-white"
                >
                    <TableHeader className="[&_tr]:border-b">
                        <TableRow>
                            <TableHead className="w-[50px]" />
                            <TableHead className="w-[100px]">Task</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Priority</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTasks.map(task => {
                            const priorityLabels = ["Medium priority", "High priority", "Low priority"];
                            const filteredLabels = task.labels ? task.labels.filter(label => !priorityLabels.includes(label.name)) : [];
                            const priorityLabel = task.labels ? task.labels.find(label => priorityLabels.includes(label.name)) : undefined;
                            const strippedPriorityLabel = priorityLabel && priorityLabel.name.replace(" priority", "");
                            return (
                                <RowUi
                                    taskId={task.code}
                                    labels={filteredLabels}
                                    title={task.title}
                                    priority={strippedPriorityLabel}
                                    onCheckboxChange={() => {
                                        console.log(`Checkbox for task ${task.number} changed`);
                                    }} dates={[]} />
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </Suspense>
    );
}