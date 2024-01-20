// @ts-nocheck
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LpIGIxCjG8R
 */
import Pill from "@/components/Pill"
import { Badge } from "@/components/ui/badge"

export default function Component() {
    return (
        <div className="flex">
            <div className="relative mr-4">
                <div className="absolute left-1/2 -ml-0.5 h-full w-0.5 bg-gray-500" />
                <div className="relative z-10">
                    <div className="flex size-6 items-center justify-center rounded-full border-2 border-black bg-transparent">
                        <BriefcaseIcon className="text-black" />
                    </div>
                </div>
            </div>
            <div>
                <time className="text-lg font-bold text-white">2017</time>
                <h3 className="mt-2 text-xl font-bold text-white">Internship at Tickles B.V.</h3>
                <ul className="list-disc space-y-1 pl-5 text-white">
                    <li>Graphic design work for various companies.</li>
                    <li>Wordpress front-end development.</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Pill children={undefined}>Magento 1</Pill>

                </div>
                <h3 className="mt-6 text-xl font-bold text-white">Internship at Speak</h3>
                <ul className="list-disc space-y-1 pl-5 text-white">
                    <li>Graphic design work for narrowcasting for various big companies.</li>
                    <li>Wordpress front-end development.</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">WordPress</Badge>
                    <Badge variant="secondary">Adobe Photoshop</Badge>
                </div>
            </div>
        </div>
    )
}

function BriefcaseIcon(props) {
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
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    )
}
