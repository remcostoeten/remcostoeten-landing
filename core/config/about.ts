export type Education = {
  year: number
  role: string
  location: string
  details: string[]
  skills: string
  description?: string
}

export type Internship = {
  role: string
  url?: string
  location: string
  description?: string
  details: string[]
  duration?: string
  skills: string
}

export type Role = {
  internships?: Internship[]
  education?: Education[]
}

export type Experience = {
  year: number | string
  role?: string
  location?: string
  details?: string[]
  skills?: string
  roles?: Role[]
  education?: Education[]
  description?: string
}

export type Introduction = {
  name: string
  subtitle: string
  employee: string
  about: string
}

export const introduction: Introduction[] = [
  {
    name: "Remco Stoeten",
    subtitle: "Front-end Developer",
    employee: "Pleio",
    about:
      "I am a recoveringex-Magento developer and currently building  open source software at Pleio. During the day I work work with on a huge SaaS applcation written in React, GraphQL and a Django back-end with a little Vue and vanilla Javascript, and during my free time I mostly work with TypeScript & Next.js, have done a little Python, Shell & Lua, and want to learn Go, OCaml 🐪 and DevOps.",
  },
]

export const experiences: Experience[] = [
  {
    year: 2023,
    role: "Frontend Developer at Pleio - online samenwerken",
    location: "Fulltime, remote",
    description:
      "A company with deep knowledge working exclusively for non profit (Ha  ddddddddddd ). I work on a huge SaaS application written in React, GraphQL and a Django back-end with a little Vue and vanilla Javascript.",
    details: [
      "Continued development and complete front-end (design) refactoring of FSV Portaal.",
      "Continued development of the Pleio-platform (SaaS for non-profit organizations and governments in React, GraphQL).",
      "Continued development of PDF Checker (Vue).",
    ],
    skills: "TypeScript, Vue.js, React.js, JavaScript, SCSS",
  },
  {
    year: 2022,
    role: "Developer at Distil BV",
    location: "Fulltime, Heerenveen, Friesland, Netherlands",
    details: [
      "Sole dedicated front-end responsible for migrating legacy code to a new design using .cshtml (Razor) templates, BEM SCSS structure, and vanilla + KnockoutJS JavaScript.",
      "Took initial steps into the world of React while assisting in the rewrite of a legacy SaaS application in React + .NET.",
    ],
    skills: "ASP.NET Razor, KnockoutJS, Scss, React.js, JavaScript",
  },
  {
    year: "2017 - 2022",
    role: "Front-end Developer at Tickles Digital Agency B.V.",
    location: "Fulltime, Joure, Friesland, Netherlands",
    details: [
      "Acquired job as Front-end Magento 2 Developer.",
      "Joined as a Front-end developer after an internship during media design studies.",
      "Developed from a complete beginner to a self-sufficient Front-end developer capable of translating UX designs into responsive code.",
      "Worked on numerous Magento 2 webshops with varying complexities.",
    ],
    skills: "Magento 2, Scrum, PHP, JavaScript, SCSS",
  },
  {
    year: 2017,
    roles: [
      {
        internships: [
          {
            role: "Graphic design degree 🎉",
            url: "https://www.rocfriesepoort.nl/",
            location: "Sneek, Friesland, Netherlands",
            description:
              "Four years of Graphic Design studies where the first two we're generic (print), video (AV), and web design, and the last two we're specialized in interactive web design where we learned the entire from wireframe, paper-sketching, photoshop (No figma yet 😉) to a fully interactive website.",
            details: ["Graduated with specificity in interactive web-design."],
            duration: "201 - 2017",
            skills:
              "Photoshop, Illustrator, InDesign, After Effects, HTML, CSS, JavaScript",
          },
          {
            role: "Internship at Tickles B.V.",
            url: "https://www.tickles.nl/",
            location: "Joure, Friesland, Netherlands",
            details: [
              "Graphic design work for various companies.",
              "Wordpress front-end development.",
            ],
            skills:
              "Magento 1, Magento 2, HTML, SCSS, JavaScript, jQuery, Adobe Photoshop, Scrum, Jira/Atlassian, Agile",
          },
          {
            role: "Internship at Speak",
            location: "Heerenveen, Friesland, Netherlands",
            url: "https://www.speak.nl/",
            details: [
              "Graphic design work for narrowcasting for various big companies.",
              "Wordpress front-end development.",
            ],
            skills: "WordPress, Adobe Photoshop",
          },
        ],
      },
    ],
    education: [
      {
        year: 2013 - 2017,
        role: "College degree in Graphic Design",
        location: "ROC Friese poort Sneek, Friesland, Netherlands",
        details: ["Graduated with specificity in interactive web-design."],
        skills:
          "Adobe Suite (Photoshop, Illustrator, InDesign, After Effects), HTML, CSS, JavaScript",
      },
    ],
  },
]
