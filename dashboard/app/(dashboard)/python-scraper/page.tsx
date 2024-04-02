// 'use client'
// import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
// import {
//   TableHead,
//   TableRow,
//   TableHeader,
//   TableCell,
//   TableBody,
//   Table,
// } from "@/components/ui/table";
// import { useState, useEffect } from "react";
// import StatusComponent from "./Status";

// export default function Component() {
//   const [onlineStatus, setOnlineStatus] = useState(null);
//   const [onlineStatusHistory, setOnlineStatusHistory] = useState([]);

//   const fetchStatus = async () => {
//     try {
//       const response = await fetch("/api/status");
//       const data = await response.json();
//       setOnlineStatus(data.status);
//       setOnlineStatusHistory(data.history);
//     } catch (error) {
//       console.error("Error fetching status:", error);
//       // Handle errors appropriately, e.g., display an error message
//     }
//   };

//   useEffect(() => {
//     fetchStatus();
//     // Refresh status every 30 seconds
//     const interval = setInterval(fetchStatus, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex flex-col w-full min-h-screen">
//       <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
//         {/* Navigation links */}
//       </header>
//       <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//             <CardTitle className="text-sm font-medium">Online Status</CardTitle>
//             <Button onClick={fetchStatus} size="sm">
//               Check Now
//             </Button>
//             <StatusComponent status={onlineStatus} />
//           </CardHeader>
//           <CardContent className="flex items-center gap-4">
//             {/* Display user information and status */}
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//             <CardTitle className="text-sm font-medium">Online Status History</CardTitle>
//             {/* Export button */}
//           </CardHeader>
//           <CardContent className="p-0">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="w-[100px]">Type</TableHead>
//                   <TableHead>Timestamp</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {onlineStatusHistory.map((status, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{status.type}</TableCell>
//                     <TableCell>{status.timestamp}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }

// function Package2Icon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
//       <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
//       <path d="M12 3v6" />
//     </svg>
//   );
// }

// function SearchIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="11" cy="11" r="8" />
//       <path d="m21 21-4.3-4.3" />
//     </svg>
//   );
// }

// function UserIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//       <circle cx="12" cy="7" r="4" />
//     </svg>
//   );
// }

import React from "react";
import StatusComponent from "./Status";

export default function page() {
  return (
    <div>
      <StatusComponent />
    </div>
  );
}
