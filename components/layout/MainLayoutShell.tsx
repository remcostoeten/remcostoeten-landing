"use client"

import React, { useState } from "react"

import { BEZIER_CURVES } from "@/core/lib/bezier-curves"

import AnimatedElement from "../effects/AnimatedElement"
import { Button } from "../ui/button"

interface ShellLayoutProps {
    children?: any
    header?: any
}

export default function ShellLayout({ children, header }: ShellLayoutProps) {
    const [sidebarVisible, setSidebarVisible] = useState(false)
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible)
    }
    return (
        <div className="mx-auto sm:flex md:max-w-[1440px] p-8">
            <AnimatedElement
                as="aside"
                duration={0.8}
                ease={BEZIER_CURVES.BEZIERWTO}
                x={5}
                y={5}
                className={`${sidebarVisible ? "sidebar-hidden" : "sidebar-visible"
                    } mx-auto sm:flex md:max-w-[1440px] lg:px-8`}
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
                className="flex-1 px-8"
            >
                {children}
                <Button
                    variant="outline"
                    className="fixed right-4 top-4 hidden sm:block"
                    onClick={toggleSidebar}
                >
                    {sidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
                </Button>
            </AnimatedElement>
        </div>
    )
}
