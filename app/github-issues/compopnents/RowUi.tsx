import { ChangeEvent } from "react";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TableRow, TableCell } from "@/components/ui/table";
import { formatDate } from "@/core/lib/utils";

type RowUiProps = {
    taskId: string;
    dates: string[];
    label: string;
    title: string;
    priority: string;
    status: string;
    onCheckboxChange: () => void;
};

export default function RowUi({
    taskId,
    dates,
    label,
    title,
    priority,
    status,
    onCheckboxChange,
}: RowUiProps) {
    return (
        <TableRow className="border-b transition-colors hover:bg-muted/15 data-[state=selected]:bg-muted">
            <TableCell>
                <Checkbox onChange={onCheckboxChange} />
            </TableCell>
            <TableCell className="flex flex-col  text-left font-medium">
                <span>{taskId}</span>
                {dates.map((date) => {
                    return <span className="text-[12px]">{formatDate(date)}</span>;
                })}
            </TableCell>
            <TableCell>
                <span className="flex items-center gap-2">
                    <Badge variant="outline">{label}</Badge>
                    {title}
                </span>
            </TableCell>
            <TableCell>
                <span className="flex items-center ">
                    {priority.toLowerCase() === "low" && <Icons.arrowBottom className="h-4 w-4" />}
                    {priority.toLowerCase() === "medium" && <Icons.arrowRight className="h-4 w-4" />}
                    {priority.toLowerCase() === "high" && <Icons.arrowTop className="h-4 w-4" />}
                    <span>{priority}</span>
                </span>
            </TableCell>
            <TableCell>{status}</TableCell>
        </TableRow>
    );
}