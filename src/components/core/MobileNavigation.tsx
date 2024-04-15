"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationMenuItems } from "@/core/config/menu";
import { ThemeToggle } from "../theme-toggle";
import AnimatedElement from "../effects/AnimatedElement";

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
        setActiveNavItem(pathname);
    }, [pathname]);

    return (
        <AnimatedElement
            as="nav"
            y={-20}
            className="bb z-max bg-zinc-100 fixed top-0 left-0 right-0 mx-auto flex justify-center items-center text-white border-gray-500  sm:hidden w-full"
        >
            {" "}
            <ul className="flex">
                {navigationMenuItems.map((nav) => (
                    <li
                        key={nav.label}
                        onMouseMove={() => handleNavItemHover(nav.label)}
                        onMouseLeave={handleNavItemMouseLeave}
                        className={`relative px-4 py-2 ${activeNavItem === nav.label.toLowerCase() ? "active-nav" : ""
                            }`}
                    >
                        {nav.label !== "home" && (
                            <Link
                                href={
                                    nav.label === "Home" ? "/" : `/${nav.label.toLowerCase()}`
                                }
                                className={`relative z-20  ${activeNavItem === nav.label.toLowerCase()
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
                                className="absolute inset-0 active-nav rounded-lg"
                            ></motion.span>
                        )}

                        {activeNavItem === nav.label.toLowerCase() && (
                            <motion.span
                                layoutId="active"
                                transition={{ type: "spring", duration: 0.5 }}
                                className="z-10 active-nav absolute inset-0 border-b-2 "
                            ></motion.span>
                        )}
                    </li>
                ))}
            </ul>
        </AnimatedElement>
    );
};

export default SubHeader;