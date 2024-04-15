"use client";

import AnimatedElement from "@/components/effects/AnimatedElement";
import Seperator from "./Seperator";

interface IntroShellProps {
    title: string;
    description: string;
    showSeperator?: boolean;
    spacingTop?: string;
    spacingBottom?: string;
    children?: React.ReactNode;
}

export default function IntroShell({
    title,
    description,
    showSeperator = true,
    spacingTop = "12",
    spacingBottom = "24",
    children,
}: IntroShellProps) {
    return (
        <>
            <AnimatedElement
                ease="EASE_IN_OUT"
                className="text-2xl"
                as="h1"
                opacity={0}
                duration={1}
                y={-5}
                x={-5}
            >
                {title}
            </AnimatedElement>
            <AnimatedElement
                ease="EASE_IN_OUT"
                className={`text-gray-400 ${!showSeperator ? "mb-4" : ""}`}
                as="p"
                duration={0.5}
                delay={0.1}
                y={-5}
                x={-5}
            >
                {description}
            </AnimatedElement>
            <AnimatedElement
                duration={1}
                ease="EASE_IN_OUT"
                delay={0.2}
                x={-10}
                y={-10}
            >
                {showSeperator && (
                    <Seperator spacingTop={spacingTop} spacingBottom={spacingBottom} />
                )}
            </AnimatedElement>
            {children}
        </>
    );
}
