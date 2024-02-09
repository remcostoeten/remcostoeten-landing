//@ts-nocheck
"use client"

import React, { useEffect, useRef } from "react"
import Link from "next/link"

import { navigationMenuItems } from "@/core/config/menu"
import { BEZIER_CURVES } from "@/core/lib/bezier-curves"

import AnimatedElement from "../effects/AnimatedElement"

const BTN_ACTIVE_CLASS = "btn-active"
const GLOW_LEFT_OFFSET = 19.75

interface ICalcSwitcher {
  (activeBtn: HTMLButtonElement | null, targetBtn: HTMLButtonElement): void
}

export default function MobileNavigation() {
  const htmlRef = useRef<HTMLHtmlElement>(null)
  const startRef = useRef<HTMLDivElement>(null)
  const switcherRef = useRef<HTMLDivElement>(null)
  const switcherRootRef = useRef<HTMLDivElement>(null)
  const switcherBtnsRef = useRef<NodeListOf<HTMLButtonElement>>(null)
  const mainSectionsRef = useRef<NodeListOf<HTMLElement>>(null)
  const topsRef = useRef<number[]>([])
  const resizeTimeoutRef = useRef<number>(0)

  const calcSwitcher: ICalcSwitcher = (activeBtn, targetBtn) => {
    const glow = document.querySelector(".switcher-glow") as HTMLDivElement
    const curr = document.querySelector(".switcher-curr") as HTMLDivElement

    const currLeft: number = +targetBtn.offsetLeft
    const width: number = +targetBtn.offsetWidth
    const middle: number = Math.round(width / 2)

    curr.setAttribute("style", `width: ${width}px; left: ${currLeft}px`)
    glow.style.left = `${currLeft + middle - GLOW_LEFT_OFFSET}px`

    const switcherOffsetWidth: number = switcherRef.current!.offsetWidth
    const sumOffsetX: number = Math.round(currLeft + middle + 4)
    const multOffsetX: number = Math.round(
      (sumOffsetX / switcherOffsetWidth) * 100
    )
    switcherRef.current!.style.setProperty("--x", `${100 - multOffsetX}%`)
    targetBtn.classList.add(BTN_ACTIVE_CLASS)

    if (!activeBtn) return
    activeBtn.classList.remove(BTN_ACTIVE_CLASS)
  }

  const handleSwitcher = (e: React.MouseEvent): void => {
    const currentTarget = e.currentTarget as HTMLElement
    const target = e.target as HTMLElement

    const activeBtn = currentTarget.querySelector(
      `.${BTN_ACTIVE_CLASS}`
    ) as HTMLButtonElement | null
    const closestBtn = target.closest(".switcher-btn") as HTMLButtonElement

    if (!closestBtn) return
    if (closestBtn === activeBtn) returnN
    calcSwitcher(activeBtn, closestBtn)

    const targetSection = document.querySelector(
      `#${closestBtn.dataset.scrollTo}`
    ) as HTMLElement
    window.scrollTo({
      top: targetSection.id === "home" ? 0 : targetSection.offsetTop + 10,
      behavior: "smooth",
    })
  }

  const generateTops = (): number[] => {
    const topsArray: number[] = [startRef.current!.offsetTop]
    for (const section of mainSectionsRef.current!) {
      topsArray.push(section.offsetTop + startRef.current!.offsetTop)
    }
    return topsArray
  }

  const switcherScroll = (): void => {
    const startingTop: number = startRef.current!.offsetTop
    const windowScrollY: number = Math.round(window.scrollY)
    const switcherHeight: number = switcherRef.current!.offsetHeight

    if (windowScrollY >= startingTop - 15) {
      switcherRef.current!.classList.add("switcher-fixed")
    } else {
      switcherRef.current!.classList.remove("switcher-fixed")
    }

    const currDiff: number = windowScrollY - startingTop - switcherHeight
    const activeBtn = document.querySelector(
      `.${BTN_ACTIVE_CLASS}`
    ) as HTMLButtonElement | null
    let currSection: number = 0

    for (let i = 0; i < topsRef.current!.length; i++) {
      if (topsRef.current![i] > currDiff) {
        currSection = i
        break
      }
    }

    const targetBtn = switcherBtnsRef.current![currSection] as HTMLButtonElement
    if (activeBtn === targetBtn) return
    calcSwitcher(activeBtn, targetBtn)
  }

  const handleResize = (): void => {
    clearTimeout(resizeTimeoutRef.current!)
    resizeTimeoutRef.current = setTimeout(() => {
      htmlRef.current!.style.scrollBehavior = "auto"
      topsRef.current = generateTops()
      htmlRef.current!.style.scrollBehavior = "smooth"
    }, 20)
  }

  const initElements = (): void => {
    htmlRef.current = document.documentElement
    startRef.current = document.querySelector(".start") as HTMLDivElement
    switcherRef.current = document.querySelector(".switcher") as HTMLDivElement
    switcherRootRef.current = document.querySelector(
      ".switcher-root"
    ) as HTMLDivElement
    switcherBtnsRef.current = document.querySelectorAll(
      ".switcher-btn"
    ) as NodeListOf<HTMLButtonElement>
    mainSectionsRef.current = document.querySelectorAll(
      "section"
    ) as NodeListOf<HTMLElement>
    topsRef.current = generateTops()
  }

  const setUpLoad = (): void => {
    calcSwitcher(null, switcherBtnsRef.current![0])
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual"
    }
  }

  const initListeners = (): void => {
    htmlRef.current!.style.scrollBehavior = "smooth"
    startRef.current!.style.height = `${switcherRef.current!.offsetHeight}px`
    switcherRootRef.current!.addEventListener("click", handleSwitcher)
    window.addEventListener("scroll", switcherScroll, true)
    window.addEventListener("resize", handleResize)
  }

  const initApp = (): void => {
    initElements()
    setUpLoad()
    initListeners()
  }

  useEffect(() => {
    initApp()
    window.addEventListener("load", initApp, { once: true })

    return () => {
      window.removeEventListener("load", initApp)
    }
  }, [])

  type MenuItemTypes = {
    label: string
    href: any
  }

  const MenuItem = ({ label, href }: MenuItemTypes) => (
    <button className="switcher-btn" type="button">
      {href ? <Link href={href}>{label}</Link> : <span>{label}</span>}
    </button>
  )

  return (
    <AnimatedElement
      opacity={0}
      duration={1}
      delay={0.5}
      ease={BEZIER_CURVES.BEZIERWTO}
      as="header"
      className="mobile-navigation block sm:hidden "
    >
      <div className="header sa" id="home">
        <div className="start" style={{ height: "45px" }} ref={startRef}></div>
        <div className="switcher" style={{ "--x": "100%" }} ref={switcherRef}>
          <div
            aria-hidden="true"
            className="switcher-stroke"
            style={{ position: "absolute" }}
          ></div>
          <div className="switcher-root" ref={switcherRootRef}>
            {navigationMenuItems.map((item, index) => (
              <MenuItem key={index} label={item.label} href={item.href} />
            ))}
            <div
              aria-hidden="true"
              className="switcher-glow"
              style={{ left: "23.75px" }}
            ></div>
            <div
              aria-hidden="true"
              className="switcher-curr"
              style={{ left: "4px" }}
            ></div>
          </div>
        </div>
      </div>
    </AnimatedElement>
  )
}
