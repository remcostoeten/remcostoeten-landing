'use client';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { TableRow, TableCell, Table, TableBody, TableHead, TableHeader } from '@/components/ui/table';
import { formatDate } from '@/core/lib/utils';
import { Checkbox } from '@radix-ui/react-checkbox';
import RowUi from './compopnents/RowUi';

type RowUiProps = {
    taskId: string;
    dates: string[];
    label: string;
    title: string;
    priority: string;
    status: string;
    onCheckboxChange: () => void;
};

export default function page() {
    return (
        <div>
            <Table key="1" className="divide-y divide-gray-900  !rounded-md border text-white">
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