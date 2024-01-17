'use client'

const experiences = [{ year: 2023, role: 'Frontend Developer at Pleio - online samenwerken', location: 'Fulltime, remote', details: ['Continued development and complete front-end (design) refactoring of FSV Portaal.', 'Continued development of the Pleio-platform (SaaS for non-profit organizations and governments in React, GraphQL).', 'Continued development of PDF Checker (Vue).',], skills: 'TypeScript, Vue.js, React.js, JavaScript, SCSS', }, { year: 2022, role: 'Developer at Distil BV', location: 'Fulltime, Heerenveen, Friesland, Netherlands', details: ['Sole dedicated front-end responsible for migrating legacy code to a new design using .cshtml (Razor) templates, BEM SCSS structure, and vanilla + KnockoutJS JavaScript.', 'Took initial steps into the world of React while assisting in the rewrite of a legacy SaaS application in React + .NET.',], skills: 'ASP.NET Razor, KnockoutJS, Scss, React.js, JavaScript', }, { year: '2017 - 2022', role: 'Front-end Developer at Tickles Digital Agency B.V.', location: 'Fulltime, Joure, Friesland, Netherlands', details: ['Acquired job as Front-end Magento 2 Developer.', 'Joined as a Front-end developer after an internship during media design studies.', 'Developed from a complete beginner to a self-sufficient Front-end developer capable of translating UX designs into responsive code.', 'Worked on numerous Magento 2 webshops with varying complexities.',], skills: 'Magento 2, Scrum, PHP, JavaScript, SCSS', }, { year: 2017, role: 'Internship at Speak', location: '', details: [], skills: '', }, { year: 2017, role: 'College degree in Graphic Design', location: '', details: [], skills: '', },];
export default function Component() {
  return (
    <div className="flex flex-col space-y-6">
      {experiences.map((experience, index) => {
        const Icon = [CalendarIcon, ClockIcon, FlagIcon, HeartIcon]; // declare the 'Icon' variable before using it

        return (
          <div className="flex items-start space-x-4" key={experience.year}>
            <div className="flex-1 border-l-2 pl-4">
              <h3 className="font-semibold">{experience.year}</h3>
              <h4>{experience.role}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{experience.location}</p>
              {experience.details.map((detail, detailIndex) => (
                <p key={detailIndex} className="text-sm text-gray-500 dark:text-gray-400">{detail}</p>
              ))}
              <p className="text-sm text-gray-500 dark:text-gray-400">{experience.skills}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CalendarIcon(props) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}


function ClockIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function FlagIcon(props) {
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
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}


function HeartIcon(props) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function LightbulbIcon(props) {
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
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}


function RocketIcon(props) {
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
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}


function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
