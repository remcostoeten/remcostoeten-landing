"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationMenuItems } from "@/core/config/menu";

const SubHeader = () => {
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const pathname = usePathname();

  const handleNavItemHover = (navId: string) => {
    setHoveredNavItem(navId);
  };

  const handleNavItemMouseLeave = () => {
    setHoveredNavItem(null);
  };

  useEffect(() => {
    setActiveNavItem(pathname.substring(1));
  }, [pathname]);

  return (
    <nav className=" mx-auto flex justify-between items-center text-white border-b border-gray-500 bg-stone-900 sm:hidden">
      <ul className="flex">
        {navigationMenuItems.map((nav) => (
          <li
            key={nav.label}
            onMouseMove={() => handleNavItemHover(nav.label)}
            onMouseLeave={handleNavItemMouseLeave}
            className="relative px-4 py-2"
          >
            {nav.label !== "home" && (
              <Link
                href={
                  nav.label === "Home" ? "/" : `/${nav.label.toLowerCase()}`
                }
                className={`relative z-20  ${
                  activeNavItem === nav.label
                    ? "text-gray-200"
                    : "text-gray-500"
                }`}
              >
                {nav.label}
              </Link>
            )}

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
