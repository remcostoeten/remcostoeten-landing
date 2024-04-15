"use client";

import { BEZIER_CURVES, BezierCurve } from "@/core/lib/bezier-curves";
import { HTMLMotionProps, motion } from "framer-motion";

interface AnimatedElementProps extends HTMLMotionProps<"div"> {
  as?: keyof JSX.IntrinsicElements;
  opacity?: number;
  duration?: number;
  delay?: number;
  ease?: keyof typeof BEZIER_CURVES | BezierCurve;
  x?: number;
  y?: number;
  scale?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function AnimatedElement({
  as = "div",
  opacity = 0,
  duration = 0.5,
  delay = 0,
  ease = "EASE_IN",
  x = 0,
  y = 0,
  scale = 1,
  className,
  children,
  ...restProps
}: AnimatedElementProps) {
  const Element = motion[as];

  const animationProps = {
    initial: { opacity: opacity, x, y, scale },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale,
      transition: {
        duration,
        delay,
        ease: typeof ease === "string" ? BEZIER_CURVES[ease] : ease,
      },
    },
  };

  return (
    <Element {...animationProps} className={className} {...restProps}>
      {children}
    </Element>
  );
}

/**
 * An animated element component that can be used with various HTML elements.
 *
 * @example
 * // Example 1: Using AnimatedElement with a heading
 * <AnimatedElement as="h1" initialOpacity={0} duration={1} ease="EASE_OUT">
 *   Animated Heading
 * </AnimatedElement>
 *
 * @example
 * // Example 2: Using AnimatedElement with a paragraph
 * <AnimatedElement as="p" initialOpacity={0} duration={0.8} delay={0.2} x={10}>
 *   Animated paragraph with a slight delay and horizontal movement.
 * </AnimatedElement>
 */
