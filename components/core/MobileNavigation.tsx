 'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { navigationMenuItems } from "@/core/config/menu";

const SubHeader = () => {
  const router = useRouter();
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
    const pathname = usePathname();
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "integration", label: "Integration" },
    { id: "settings", label: "Settings" },
    { id: "profile", label: "Profile" },
    { id: "analytics", label: "Analytics" },
    { id: "notifications", label: "Notifications" },
    { id: "billing", label: "Billing" },
    { id: "security", label: "Security" },
  ];

  const handleNavItemHover = (navId: string) => {
    setHoveredNavItem(navId);
  };

  const handleNavItemMouseLeave = () => {
    setHoveredNavItem(null);
  };

  useEffect(() => {
    // Update activeNavItem when location changes
    setActiveNavItem(pathname.substring(1));
  }, [pathname]);

  return (
    <nav className="container mx-auto flex justify-between items-center  text-white border-b border-gray-500">
      <ul className="flex">
        {navigationMenuItems.map((nav) => (
          <li
            key={nav.label}
            onMouseMove={() => handleNavItemHover(nav.label)}
            onMouseLeave={handleNavItemMouseLeave}
            className="relative px-4 py-2"
          >
            <Link href={`/${nav.label}`} className={`relative z-20  ${
                activeNavItem === nav.label ? "text-gray-200" : "text-gray-500"
              }`}>
                {nav.label}
            </Link>
            {hoveredNavItem === nav.label && (
              <motion.span
                layoutId="hover"
                transition={{ type: "spring", duration: 0.4 }}
                className="absolute inset-0  bg-gray-600/50 rounded-lg"
              ></motion.span>
            )}
            {activeNavItem === nav.label && (
              <motion.span
                layoutId="active"
                transition={{ type: "spring", duration: 0.5 }}
                className="z-10 absolute inset-0 border-b-2 "
              ></motion.span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubHeader;