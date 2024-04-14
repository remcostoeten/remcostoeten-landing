"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsArrowRightShort as ExternalLinkIcon } from "react-icons/bs";

import { MenuItemProps } from "@/core/types/menu";
import { clsx } from "@/core/lib/clsx";

const MenuItem = ({
  title,
  href,
  icon,
  onClick,
  className = "",
  children,
  hideIcon = false,
}: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isExternalUrl = href?.includes("http");
  const isHashLink = href === "#";
  const pathname = usePathname();
  const activeClasses = `flex font-sora items-center gap-2 py-2 text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 hover:dark:text-neutral-300 rounded-lg group ${
    pathname === href
      ? "text-neutral-900 dark:!text-neutral-200"
      : "hover:dark:!text-neutral-300 hover:lg:rounded-lg lg:hover:scale-105 lg:transition-all lg:duration-300"
  }`;

  const handleClick = () => {
    if (onClick) onClick();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const elementProps = {
    className: `${activeClasses} ${className}`,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  const isActiveRoute = pathname === href;

  const itemComponent = () => {
    return (
      <div {...elementProps}>
        {!hideIcon && (
          <div
            className={clsx(
              "group-hover:-rotate-12 transition-all duration-300",
              isActiveRoute && "-rotate-12"
            )}
          >
            {icon}
          </div>
        )}
        <div className="ml-0.5 grow">{title}</div>
        {children && <>{children}</>}
        {isActiveRoute && (
          <ExternalLinkIcon size={22} className="animate-pulse text-gray-500" />
        )}
        {isExternalUrl && isHovered && (
          <ExternalLinkIcon
            size={22}
            className="-rotate-45 text-gray-500 lg:transition-all lg:duration-300"
          />
        )}
      </div>
    );
  };

  return isHashLink ? (
    <div className="cursor-pointer">{itemComponent()}</div>
  ) : (
    <Link
      href={href}
      target={isExternalUrl ? "_blank" : ""}
      onClick={handleClick}
    >
      {itemComponent()}
    </Link>
  );
};

export default MenuItem;
