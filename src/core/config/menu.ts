import { Icons } from "@/components/icons";
import { contactInfo } from "./personal-info";

// export const navigationMenuItems = [
//     { label: "Home", icon: Icons.home, href: "/", isMobile: false },
//     { label: "Experience", href: "experience", icon: Icons.user, isMobile: false },
//     { label: "Projects", icon: Icons.code, href: "projects", isMobile: false },
//     { label: "Issues", icon: Icons.todo, href: "issues", isMobile: false },
//     { label: "Guestbook", icon: Icons.PencilIcon, href: "guestbook", isMobile: false },
//     { title: "Projects", href: "/", isMobile: true },
//     { title: "Agency", href: "/", isMobile: true },
//     { title: "Expertise", href: "/", isMobile: true },
//     { title: "Careers", href: "/", isMobile: true },
//     { title: "Contact", href: "/", isMobile: true },
// ];

export const navigationMenuItems = [
  { label: "Home", icon: Icons.home, href: "/" },
  { label: "Experience", href: "experience", icon: Icons.user },
  { label: "Projects", icon: Icons.code, href: "projects" },
  { label: "Issues", icon: Icons.todo, href: "issues" },
  { label: "Guestbook", icon: Icons.PencilIcon, href: "guestbook" },
];

export const footerLinks = [
  {
    title: "Github",
    href: contactInfo.github,
    handle: contactInfo.handle,
  },
  {
    title: "LinkedIn",
    href: contactInfo.linkedin,
    handle: contactInfo.linkedinhandle,
  },
  {
    title: "GitLab",
    href: contactInfo.gitlab,
    handle: contactInfo.handle,
  },
  {
    title: "Email",
    href: `mailto:${contactInfo.email}`,
    handle: contactInfo.handle,
  },
  {
    title: "Phone",
    href: `tel:${contactInfo.phone}`,
    handle: contactInfo.handle,
  },
];
