import React from "react"

type SeperatorProps = {
  width?: string
  fade?: any
  color?: string
  opacity?: string
  className?: string
  spacing?: string
}

export default function Seperator({
  width = "100%",
  fade = false,
  color = "dark:neutral-100 neutral-800",
  opacity = "100",
  spacing = "0",
  className = "",
}: SeperatorProps) {
  const bgColor = fade ? `linear-gradient(to right, transparent, ${color}, transparent)` : color;
  return (
    <hr className={`bg- h-0.5 border-t-0${bgColor} opacity-${opacity} dark:opacity-50 ${className}`}
      style={{
        width: width,
        marginTop: spacing + 'px',
        marginBottom: spacing + 'px'
      }}
    />
  )
}