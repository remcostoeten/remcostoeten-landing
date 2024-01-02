"use client"


import {
    Table,
    TableBody, TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

import TableToolbar from "./compopnents/TableToolbar"
import RowData from "./compopnents/RowData";

export default function Page() {
    const handleSearch = (searchTerm) => {
        console.log(`Search for ${searchTerm}`);
    };

    const handleFilter = (filter) => {
        console.log(`Filter by ${filter}`);
    };

    return (
        <div className="flex flex-col gap-4">
            <TableToolbar
                onSearch={handleSearch}
                onFilter={handleFilter}
            />
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
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <RowData />
                </TableBody>
            </Table>
        </div>
    );
}
