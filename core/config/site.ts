export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Remco Stoeten - Snippets and blogs for remcostoeten.com",
  description:
    "This is an app containing various snippets, guides, and productivity scripts I use personally or for my job. The site is maintained via Markdown.mdx and powered by Nextra, which is a static site generator built with NextJS and TypeScript.    ",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/remcostoeten",
    docs: "https://snippets.remcostoeten.com",
  },
}
