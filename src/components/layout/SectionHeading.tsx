import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  className?: string;
  icon?: ReactNode;
  topMargin?: any;
  iconBehind?: boolean;
}

export default function SectionHeading({
  title,
  icon,
  iconBehind = false,
  className = "",
  topMargin,
  ...rest
}: SectionHeadingProps) {
  return (
    <div
      className={`flex items-center  gap-1 leading-[1.8] text-neutral-800 md:leading-loose  dark:text-neutral-300 ${
        topMargin && "mt-4"
      } ${className}`}
      {...rest}
    >
      {!iconBehind && icon && <>{icon}</>}
      <h2 className="capitalize">{title}</h2>
      {iconBehind && icon && <>{icon}</>}
    </div>
  );
}
