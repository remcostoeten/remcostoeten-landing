/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rWrlF3LgVjC
 */
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Icons } from "@/components/icons"


export default function GithubIssuePage() {
    const RowUi = () => {
        return (
            <TableRow className="border-b transition-colors hover:bg-muted/15 data-[state=selected]:bg-muted">
                <TableCell>
                    <Checkbox />
                </TableCell>
                <TableCell className="flex flex-col justify-center font-medium"><span>TASK-62</span>    </TableCell>
                <TableCell>
                    {/* label and itle */}
                    <span className="flex items-center gap-2">
                        <Badge variant="outline"> UI </Badge>
                        Style blog syntax highlight.</span>
                </TableCell>

                <TableCell>
                    {/* priority */}
                    <span className="flex items-center ">
                        <Icons.arrowRight className="h-4 w-4" />
                        <span>Medium </span>
                    </span>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                    {/* status */}
                    Todo
                </TableCell>
            </TableRow>
        )
    }
    // border - b transition - colors hover: bg - muted / 10 data - [state = selected]: bg - muted
    return (
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
                <RowUi />
                <RowUi />
            </TableBody>
        </Table >
    )
}

function SignalHighIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 20h.01" />
            <path d="M7 20v-4" />
            <path d="M12 20v-8" />
            <path d="M17 20V8" />
        </svg>
    )
}


function SignalMediumIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 20h.01" />
            <path d="M7 20v-4" />
            <path d="M12 20v-8" />
        </svg>
    )
}
