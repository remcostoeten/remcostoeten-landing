import { Badge } from "@/components/ui/badge"

type ExperienceProps = {
    icon?: JSX.Element
    year?: string
    role?: string
    location?: string
    details?: string[]
    skills?: string[]
    url?: string
    internships?: string[]
}

export default function ExperienceYearShell({ icon, year, role, location, details, skills, url, internships }: ExperienceProps) {
    return (
        <div className="flex">
            <div className="relative mr-4">
                <div className="absolute bottom-0 left-1/2 top-4 w-0.5 bg-red-400" />
                <div className="relative z-10">
                    <div className="1border-lightgray text-lightgrey flex items-center justify-center rounded-full border p-2">
                        {icon}
                    </div>
                </div>
            </div>
            <div>
                <time className="block text-lg font-semibold text-white" dateTime="2017">
                    QA             2017
                </time>
                <h3 className="mt-2 text-xl font-bold text-white">Internship at Tickles B.V.</h3>
                <ul className="ml-5 list-disc space-y-2 text-white">
                    <li>Graphic design work for various companies.</li>
                    <li>Wordpress front-end development.</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">Magento 1</Badge>
                    <Badge variant="secondary">Magento 2</Badge>
                    <Badge variant="secondary">HTML</Badge>
                    <Badge variant="secondary">SCSS</Badge>
                    <Badge variant="secondary">JavaScript</Badge>
                    <Badge variant="secondary">jQuery</Badge>
                    <Badge variant="secondary">Adobe Photoshop</Badge>
                    <Badge variant="secondary">Scrum</Badge>
                    <Badge variant="secondary">Jira/Atlassian</Badge>
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">Internship at Speak</h3>
                <ul className="ml-5 list-disc space-y-2 text-white">
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
