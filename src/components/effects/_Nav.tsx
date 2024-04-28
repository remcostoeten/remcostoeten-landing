// @ts-ignore
import { usePathname } from "next/navigation";
import * as React from "react";
import { useState, useEffect } from "react";

interface AvatarProps {
    src: string;
    alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
    return (
        <img
            loading="lazy"
            src={src}
            alt={alt}
            className="shrink-0 aspect-[1.3] w-[52px]"
        />
    );
};

interface IconProps {
    src: string;
    alt: string;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ src, alt, className = "" }) => {
    return (
        <img
            loading="lazy"
            src={src}
            alt={alt}
            className={`shrink-0 self-stretch my-auto aspect-square w-[22px] ${className}`}
        />
    );
};
interface NavProps {
    setIsActive: any;
}
export const Nav: React.FC<NavProps> = ({ setIsActive }) => {
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
        // Update activeNavItem when location changes
        setActiveNavItem(pathname.substring(1));
    }, [pathname]);

    return (
        <div className="flex gap-5 justify-center px-4 bg-neutral-950 block sm:hidden">
            <div className="flex gap-0.5 py-3 text-sm font-medium leading-5 text-gray-200 whitespace-nowrap">
                <Avatar
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a706d666ee96c0d57901ee63ca3dd552de226efb001d10842c41ea90060c52f5?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&"
                    alt="User avatar"
                />
                <div className="flex gap-2 justify-center items-center">
                    <Icon
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/249214decbef2282a15cceddce4464e4d8e8d2328259fd931ef29b2013904e91?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&"
                        alt="Icon 1"
                    />
                    <Icon
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb2f536843d63f3d94242a1b3d31adcdf3ff3eb4c0640e75a81392c3959f621f?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&"
                        alt="Icon 2"
                        className="shadow-sm"
                    />
                    <div className="flex gap-1 self-stretch">
                        <div className="grow my-auto">remcostoeten</div>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2317de25f49225d0de642c742b2e2f73368da05b7a16ffae243cf20b5ec530bc?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&"
                            alt="Badge"
                            className="shrink-0 w-7 shadow-sm aspect-[0.7]"
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-2 my-auto">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/97f594b23339a91a5f6a6e4d4d41bc0f05284c166c5aee263013d9875a541d17?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&"
                    alt="Profile"
                    className="shrink-0 w-8 border border-solid aspect-square border-white border-opacity-10"
                />
            </div>
            <div className="flex gap-2 my-auto">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/97f594b23339a91a5f6a6e4d4d41bc0f05284c166c5aee263013d9875a541d17?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&"
                    alt="Profile"
                    className="shrink-0 w-8 border border-solid aspect-square border-white border-opacity-10"
                />
            </div>
        </div>
    );
};

export default Nav;
