'use client'
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useState } from "react";
const initialState = { onlineStatus: null };

export default function Component() {
  const [onlineStatus, setOnlineStatus] = useState(initialState.onlineStatus);

  const handleCheckStatus = async () => {
    try {
      const response = await fetch("/api/status");
      const data = await response.json();
      setOnlineStatus(data.status);
    } catch (error) {
      console.error("Error fetching status:", error);
      // Handle errors appropriately, e.g., display an error message
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            href="#"
          >
            <Package2Icon className="w-6 h-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Dashboard
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Messages
          </Link>
          <Link className="font-bold" href="#">
            Online Status
          </Link>
        </nav>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="flex-1 ml-auto sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Search messages..."
                type="search"
              />
            </div>
          </form>
          <Button className="rounded-full" size="icon" variant="ghost">
            <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Online Status</CardTitle>
            <Button onClick={handleCheckStatus} size="sm">
              Check Now
            </Button>
            <StatusComponent status={onlineStatus} />
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <UserIcon className="w-10 h-10" />
              <Button size="xs" variant="outline">
                Last Seen: 10:30 AM
              </Button>
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="font-semibold">Alice Johnson</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Online Status
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Last Seen: 10:30 AM
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Online Status History
            </CardTitle>
            <Button size="xs">Export</Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Type</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Online</TableCell>
                  <TableCell>10:30 AM</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Offline</TableCell>
                  <TableCell>9:45 AM</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Online</TableCell>
                  <TableCell>9:30 AM</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Offline</TableCell>
                  <TableCell>9:00 AM</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Online</TableCell>
                  <TableCell>8:45 AM</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function Package2Icon(props) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}


function StatusComponent({ status }) {
  return (
    <div>
      {status === "Online" ? "Online" : status === "Offline" ? "Offline" : "Checking..."}
    </div>
  );
}