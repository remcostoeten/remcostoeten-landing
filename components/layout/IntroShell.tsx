"use client"
import React from 'react';
import AnimatedElement from "../effects/AnimatedElement";
import { Icons } from "../icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Seperator from "./Seperator";

interface IntroShellProps {
    title?: string;
    description?: string;
    showSeperator?: boolean;
    spacingTop?: string;
    spacingBottom?: string;
    tooltipIcon?: React.ReactNode;
    tooltipContent?: string;
    children?: React.ReactNode;
}

export default function IntroShell({
    title,
    description,
    showSeperator = true,
    spacingTop = "12",
    spacingBottom = "24",
    tooltipIcon,
    tooltipContent,
    children,
}: IntroShellProps) {
    return (
        <>
            <AnimatedElement
                ease="EASE_IN_OUT"
                className="flex items-center gap-2 text-2xl relative"
                as="h1"
                opacity={0}
                duration={1}
                y={-5}
                x={-5}
            >
                {title}
                {tooltipIcon && <span className="">
                    <Tooltip>
                        <TooltipTrigger><Icons.tooltip /></TooltipTrigger>
                        <TooltipContent>
                            {tooltipContent || 'Default tooltip content'}
                        </TooltipContent>
                    </Tooltip>
                </span>}
            </AnimatedElement>
            <AnimatedElement
                ease="EASE_IN_OUT"
                className={`text-gray-400 ${!showSeperator ? "mb-4" : ""
                    } relative`}
                as="p"
                duration={0.5}
                delay={0.1}
                y={-5}
                x={-5}
            >
                {description}
                {/* {tooltipIcon && <span className="absolute left-full">
                    <Tooltip>
                        <TooltipTrigger><Icons.tooltip /></TooltipTrigger>
                        <TooltipContent>
                            {tooltipContent || 'Default tooltip content'}
                        </TooltipContent>
                    </Tooltip> */}
                {/* </span>} */}
            </AnimatedElement>
            <AnimatedElement
                duration={1}
                ease="EASE_IN_OUT"
                delay={0.2}
                x={-10}
                y={-10}
            >
                {showSeperator && (
                    <Seperator
                        spacingTop={spacingTop}
                        spacingBottom={spacingBottom}
                    />
                )}
            </AnimatedElement>
            {children}
        </>
    );
}