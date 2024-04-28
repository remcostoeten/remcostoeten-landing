export type Education = {
  year: number;
  role: string;
  location: string;
  details: string[];
  skills: string;
  description?: string;
};

export type Internship = {
  role: string;
  url?: string;
  location: string;
  description?: string;
  details: string[];
  duration?: string;
  skills: string;
};

export type Role = {
  internships?: Internship[];
  education?: Education[];
};

type Project = {
  name: string;
  description?: string;
  url: string;
};

export type Experience = {
  year: number | string;
  role?: string;
  location?: string;
  details?: string[];
  site?: string;
  skills?: string;
  roles?: Role[];
  projects?: Project[];
  education?: Education[];
  description?: string;
};

export type Introduction = {
  name: string;
  subtitle: string;
  employee: string;
  about: string;
};

export const introduction: Introduction[] = [
  {
    name: "Remco Stoeten",
    subtitle: "Front-end Developer",
    employee: "Pleio",
    about:
      "I am a recoveringex-Magento developer and currently building  open source software at Pleio. During the day I work work with on a huge SaaS applcation written in React, GraphQL and a Django back-end with a little Vue and vanilla Javascript, and during my free time I mostly work with TypeScript & Next.js, have done a little Python, Shell & Lua, and want to learn Go, OCaml 🐪 and DevOps.",
  },
];
export const experiences: Experience[] = [
  {
    year: "2023 - present,",
    site: "https://pleio.nl/",
    role: "Frontend Developer at Pleio - online samenwerken",
    location: "Fulltime, remote",
    skills:
      "TypeScript, NextJS, WCAG,  React.js , StyledComponents, GraphQL, Vue.js, SaaS",
    details: [
      "SaaS provider exclusively for non-profit organizations and governments. Primairly working on the Pleio-platform (Intranet site builder in React, GraphQL). but also various tax and politic-heavy applications. Everything fully WCAG compliant and open source.",
    ],
    projects: [
      {
        name: "FSV Portaal",
        description:
          " - Django backend with vanilla JavaScript + SCSS frontend.",
        url: "https://gitlab.com/pleio/dossier",
      },
      {
        name: "Pleio-platform",
        description: " - React, GraphQL, Django, WCAG compliant.",
        url: "https://gitlab.com/pleio/frontend",
      },
      {
        name: "PDF Checker",
        description: " - Check accessibility of PDF's in Vue(2).",
        url: "https://gitlab.com/pleio/pdfchecker",
      },
    ],
  },
  {
    year: "2022 - 2023,",
    site: "https://distil.nl/",
    role: "Developer at Distil BV",
    location: "Fulltime, Heerenveen, Friesland, Netherlands",
    details: [
      "Sole dedicated front-end responsible for migrating legacy code to a new design using .cshtml (Razor) templates, BEM SCSS structure, and vanilla + KnockoutJS JavaScript.",
      "Took initial steps into the world of React while assisting in the rewrite of a legacy SaaS application in React + .NET.",
    ],
    skills:
      "ASP.NET Razor, KnockoutJS, Scss, React.js, JavaScript, inhouse, SaaS",
  },
  {
    year: "2017 - 2022,",
    site: "https://www.tickles.nl/",
    role: "Front-end Developer at Tickles Digital Agency B.V.",
    location: "Fulltime, Joure, Friesland, Netherlands",
    details: [
      "Joined as a Front-end developer after an internship during media design studies.",
      "Developed from a complete beginner to a self-sufficient Front-end developer capable of translating UX designs into responsive code.",
    ],
    projects: [
      {
        name: "Vedder & Vedder",
        description: "- B2C webshop for jewelry.",
        url: "https://vedder-vedder.com/",
      },
      {
        name: "Alcomex",
        description: "- B2B webshop for technical parts.",
        url: "https://webshop.alcomex.nl/",
      },
      {
        name: "Quality Horse Products",
        description: "- B2B webshop for horse products.",
        url: "https://www.qhp.nl/?___store=qhp_nl_NL&___from_store=qhp_en_GB",
      },
    ],
    skills: "Magento 2, Scrum, PHP, jQuery, KnockoutJS, SCSS, agency",
  },
  {
    year: "2017,",
    role: "Graphic design degree 🎉",
    site: "https://www.rocfriesepoort.nl/",
    location: "Sneek, Friesland, Netherlands",
    description:
      "Four years of Graphic Design studies where the first two we're generic (print), video (AV), and web design, and the last two we're specialized in interactive web design where we learned the entire from wireframe, paper-sketching, photoshop (No figma yet 😉) to a fully interactive website.",
    details: ["Graduated with specificity in interactive web-design."],
    skills:
      "Photoshop, Illustrator, InDesign, After Effects, HTML, CSS, JavaScript",
  },
  {
    year: "2016,",
    role: "Internship at Speak",
    site: "https://www.speak.nl/",
    location: "Heerenveen, Friesland, Netherlands",
    description:
      "Graphic design work for narrowcasting for various big companies.",
    details: [
      "Graphic design work for narrowcasting for various big companies.",
      "Wordpress front-end development.",
    ],
    skills: "WordPress, Adobe Photoshop",
  },
];
