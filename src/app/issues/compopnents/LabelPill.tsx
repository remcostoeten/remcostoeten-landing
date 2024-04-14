import React from "react";

import { hexToRGBA } from "@/core/lib/utils";

import { LabelPillProps } from "./types";

export default function LabelPill({
  label,
  children,
  color,
  background,
  borderColor,
  ...props
}: LabelPillProps) {
  const backgroundColor = hexToRGBA(background, 0.44);

  return (
    <span
      {...props}
      data-name={label}
      style={{
        color: color,
        background: backgroundColor,
        borderColor: borderColor,
        textDecoration: `none solid ${color}`,
        display: "inline-block",
        padding: "0px 7px",
        fontSize: "12px",
        fontWeight: 300,
        lineHeight: "18px",
        whiteSpace: "nowrap",
        border: `0.571429px solid ${borderColor}`,
        borderRadius: "24px",
        outlineOffset: "-2px",
        boxSizing: "border-box",
      }}
    >
      {children}
    </span>
  );
}
