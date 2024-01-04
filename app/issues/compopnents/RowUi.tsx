import { Suspense } from "react"
import { formatDate, lightenColor } from "@/core/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { TableCell, TableRow } from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Spinner from "@/components/effects/Spinner"
import { Icons } from "@/components/icons"
import Skeleton from "@/components/effects/Skeleton"
import LabelPill from "./LabelPill"
import Link from "next/link"

type RowUiProps = {
  taskId: string
  dates?: string[]
  labels?: { name: string; color: string }[]
  title: string
  url?: string
  priority: string
  onCheckboxChange?: () => void
}

export default function RowUi({
  taskId,
  dates,
  labels,
  title,
  url,
  priority,
  onCheckboxChange,
}: RowUiProps) {
  const isDataLoaded = taskId && dates && labels && title && priority;

  return (
    <>
      {
        isDataLoaded ? (
          <TableRow className="border-b transition-colors hover:bg-muted/15 data-[state=selected]:bg-muted" >
            <TableCell>
              <Checkbox onChange={onCheckboxChange} />
            </TableCell>
            <TableCell className="flex flex-col  text-left font-medium">
              <span>{taskId}</span>
              {dates &&
                dates.map((date) => {
                  return <span className="text-[12px]">{formatDate(date)}</span>
                })}
            </TableCell>
            <TableCell>
              <span className="flex items-center justify-between text-left">
                <Tooltip>
                  <TooltipTrigger className="text-left">
                    <Link target="_blank" href={url ? url : '#'}>
                      {title.slice(0, 50)}
                      {title.length > 33 ? "..." : ""}</Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Link href={url ? url : '#'}>{title}</Link>
                  </TooltipContent>
                </Tooltip>
                <div className="flex items-center gap-2">
                  {labels &&
                    labels.map((label, index) => (
                      <LabelPill
                        key={index}
                        label={label.name}
                        color={lightenColor(`#${label.color}`, 55)}
                        background={lightenColor(`#${label.color}`, 0)}
                        borderColor={lightenColor(`#${label.color}`, 0)}
                      >
                        {label.name}
                      </LabelPill>
                    ))}
                </div>
              </span>
            </TableCell>
            <TableCell>
              <span className="flex items-center ">
                {priority?.toLowerCase() === "low" && (
                  <Icons.arrowBottom className="h-4 w-4" />
                )}
                {priority?.toLowerCase() === "medium" && (
                  <Icons.arrowRight className="h-4 w-4" />
                )}
                {priority?.toLowerCase() === "high" && (
                  <Icons.arrowTop className="h-4 w-4" />
                )}
                <span>{priority}</span>
              </span>
            </TableCell>
          </TableRow>
        ) : (
          <TableRow className="border-b transition-colors hover:bg-muted/15 data-[state=selected]:bg-muted">
            <TableCell>
              <Skeleton height={32} width="full" />
            </TableCell>
            <TableCell>
              <Skeleton height={32} width="full" />
            </TableCell>
            <TableCell>
              <Skeleton height={32} width="full" />
            </TableCell>
            <TableCell>
              <Skeleton height={32} width="full" />
            </TableCell>
          </TableRow>
        )}
    </>
  )
}