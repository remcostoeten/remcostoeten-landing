import React from "react"
import Link from "next/link"

type AnimatedAnchorProps = {
  href?: any
  children?: React.ReactNode
  backgroundColor?: string
  anchor?: string
}

export default function AnimatedAnchor({
  href = "#",
  children,
  anchor,
}: AnimatedAnchorProps) {
  return (
    <Link href={href} className={anchor ? anchor : "anchor"}>
      {children}
    </Link>
  )
}
