'use client';
import * as React from "react"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  DotsHorizontalIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { catchError } from "@/core/lib/utils"
import { DataTable } from "../data-table/data-table"

type Task = {
  id: number;
  title: string;
  status: "todo" | "in-progress" | "done" | "canceled";
  priority: "low" | "medium" | "high";
  label: "bug" | "feature" | "documentation";
};

const dummyTasks: Task[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Task ${i + 1}`,
  status: "todo",
  priority: "medium",
  label: "bug",
}));

const labels: {
  value: Task["label"]
  label: string
}[] = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ];

interface TasksTableShellProps {
  data: Task[]
  pageCount: number
}

export function TasksTableShell({ data, pageCount }: TasksTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const columns = React.useMemo<ColumnDef<Task, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value)
              setSelectedRowIds((prev) =>
                prev.length === data.length ? [] : data.map((row) => row.id)
              )
            }}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              setSelectedRowIds((prev) =>
                prev.includes(row.original.id)
                  ? prev.filter((id) => id !== row.original.id)
                  : [...prev, row.original.id]
              )
            }}
            aria-label={`Select row ${row.index + 1}`}
          />
        ),
        width: "min-content",
        align: "center",
        pin: true,
      },
      {
        id: "title",
        header: "Title",
        accessor: "title",
        width: "min(0, 1fr)",
      },
      {
        id: "status",
        header: "Status",
        accessor: "status",
        width: "min-content",
        align: "center",
      },
      {
        id: "priority",
        header: "Priority",
        accessor: "priority",
        width: "min-content",
        align: "center",
      },
      {
        id: "label",
        header: "Label",
        accessor: "label",
        width: "min-content",
        align: "center",
      },
    ],
    [data]
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      selectedRowIds={selectedRowIds}
      onSelectedRowIdsChange={setSelectedRowIds}
      isPending={isPending}
    />
  )
}