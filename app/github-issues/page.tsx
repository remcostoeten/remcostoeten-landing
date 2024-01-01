"use client"

import {
    Table,
    TableBody, TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

import RowUi from "./compopnents/RowUi"
import TableToolbar from "./compopnents/TableToolbar"

export default function page() {

    return (
        <div className="flex flex-col gap-4">
            <TableToolbar
                onSearch={(searchTerm) => console.log(`Search for ${searchTerm}`)}
                onFilter={(filter) => console.log(`Filter by ${filter}`)}
            />
            <Table
                key="1"
                className="divide-y divide-gray-900  !rounded-md border text-white"
            >
                <TableHeader className="[&_tr]:border-b">
                    <TableRow>
                        <TableHead className="w-[50px]" />
                        <TableHead className="w-[100px]">Task</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <RowUi
                        taskId="TASK-1"
                        dates={["2022-01-01"]}
                        label="Demo Label"
                        title="Demo Title"
                        priority="low"
                        status="In Progress"
                        onCheckboxChange={() => console.log("Checkbox changed")}
                    />
                    <RowUi
                        taskId="TASK-1"
                        dates={["2022-01-01"]}
                        label="Demo Label"
                        title="Demo Title"
                        priority="low"
                        status="In Progress"
                        onCheckboxChange={() => console.log("Checkbox changed")}
                    />
                    <RowUi
                        taskId="TASK-1"
                        dates={["2022-01-01"]}
                        label="Demo Label"
                        title="Demo Title"
                        priority="low"
                        status="In Progress"
                        onCheckboxChange={() => console.log("Checkbox changed")}
                    />
                    <RowUi
                        taskId="TASK-1"
                        dates={["2022-01-01"]}
                        label="Demo Label"
                        title="Demo Title"
                        priority="low"
                        status="In Progress"
                        onCheckboxChange={() => console.log("Checkbox changed")}
                    />
                </TableBody>
            </Table>
        </div>
    )
}
