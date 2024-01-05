import React from "react"

import { BEZIER_CURVES } from "@/core/lib/bezier-curves"

import AnimatedElement from "../effects/AnimatedElement"

interface ShellLayoutProps {
  children?: any
  header?: any
}

export default function ShellLayout({ children, header }: ShellLayoutProps) {
  return (
    <div className=" mx-auto sm:flex md:max-w-[1440px] lg:px-8">
      <AnimatedElement
        as="aside"
        duration={0.8}
        ease={BEZIER_CURVES.BEZIERONE}
        x={5}
        y={5}
        className="hidden w-[25%] p-8 sm:block"
      >
        {header}
      </AnimatedElement>
      <AnimatedElement
        as="main"
        duration={0.8}
        ease={BEZIER_CURVES.BEZIERONE}
        x={5}
        y={5}
        delay={0.3}
        className="flex-1 p-8"
      >
        {children}
      </AnimatedElement>
    </div>
  )
}
