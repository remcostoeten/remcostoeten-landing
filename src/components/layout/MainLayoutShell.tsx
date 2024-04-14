"use client";

import { BEZIER_CURVES } from "@/core/lib/bezier-curves";

import AnimatedElement from "../effects/AnimatedElement";

interface ShellLayoutProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
}

export default function ShellLayout({ children, header }: ShellLayoutProps) {
  return (
    <div className="mx-auto sm:flex md:max-w-[1440px] top-container pt-16 smpt0 pb-24">
      <AnimatedElement
        as="aside"
        duration={0.8}
        ease={BEZIER_CURVES.BEZIERWTO}
        x={5}
        y={5}
        className="      mx-auto sm:flex md:max-w-[1440px] lg:px-8"
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
        className="flex-1 px-8  "
      >
        {children}
      </AnimatedElement>
    </div>
  );
}
