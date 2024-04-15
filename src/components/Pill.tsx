import React from "react";

type PillProps = {
  children: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  fontSize?: "8px" | "10px" | "12px" | "sm" | "md" | "lg" | "xl";
  borderRadius?: string;
};

export default function Pill({
  children,
  color = "#F2F5F6",
  backgroundColor = "#fff",
  fontSize = "sm",
  borderRadius = "rounded-lg",
}: PillProps) {
  const fontSizeClasses = {
    "8px": "text-[8px]",
    "10px": "text-[10px]",
    "12px": "text-[12px]",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
  };

  const fontSizeClass = fontSizeClasses[fontSize] || "";

  return (
    <div
      className={`bg-${backgroundColor} text-${color} ${fontSizeClass} flex items-center justify-center border border-[#323205] ${borderRadius} px-3 py-1 transition-all hover:bg-[#303330]`}
    >
      {children}
    </div>
  );
}

/**
 * Props:
 * - `children`: The content to be displayed inside the pill.
 * - `color`: The color of the text. Default is '#F2F5F6'.
 * - `backgroundColor`: The background color of the pill. Default is '#1E1F1E'.
 * - `fontSize`: The size of the text. Can be 'xs', 'sm', 'md', 'lg', or 'xl'. Default is 'sm'.
 * - `borderRadius`: The border radius of the pill. Default is 'rounded-lg'.
 *
 * Example usage:
 *
 * Default pill:
 *
 * Pill with custom color and background color:
 * <Pill color="#ffffff" backgroundColor="#ff0000">Custom Colors</Pill>
 *
 * Pill with custom font size:
 * <Pill fontSize="lg">Large Font</Pill>
 *
 * Pill with custom border radius:
 * <Pill borderRadius="rounded-full">Full Border Radius</Pill>
 */
