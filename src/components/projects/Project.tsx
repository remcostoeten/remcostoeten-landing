// @ts-nocheck
import Link from "next/link";
import Pill from "../Pill";

export default function Project() {
  return (
    <section className="w-full py-12">
      <div className="container grid max-w-6xl items-start justify-center gap-10 pb-12 mx-auto md:grid-cols-2 md:px-6 lg:gap-16 lg:pb-24">
        <div className="flex flex-col gap-4 md:order-1 md:gap-2">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">Minesweeper</h3>
            <p className="text-gray-500 dark:text-gray-400">
              A casino minesweeper variant remake with (social) authentication
              and a currency system which are stored in a database.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill>
              <span className="font-semibold">Next.js</span>
            </Pill>
            <Pill>
              <span className="font-semibold">Tailwind CSS</span>
            </Pill>
            <Pill>
              <span className="font-semibold">TypeScript</span>
            </Pill>
            <Pill>
              <span className="font-semibold">Convex database</span>
            </Pill>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4 lg:gap-2">
            <Link
              className="inline-flex h-9 items-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="#"
            >
              View Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckCircleIcon(props) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
