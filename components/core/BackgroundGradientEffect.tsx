"use client"

import { useEffect, useRef, useState } from "react"

export default function BackgroundGradientEffect({
  zIndex = 0,
  opacity = 0.1,
  color = "#B945CC",
}) {
  const gradientRef = useRef<HTMLDivElement>(null)
  const [scrollOpacity, setScrollOpacity] = useState(opacity)

  useEffect(() => {
    if (!gradientRef.current) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight
      const normalizedScroll = scrollPosition / maxScroll
      const updatedOpacity = opacity - normalizedScroll * opacity

      setScrollOpacity(updatedOpacity)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY, screenX, screenY } = event
      const x = (clientX / window.innerWidth) * 100
      const y = (clientY / window.innerHeight) * 100

      gradientRef.current.style.backgroundImage = `radial-gradient(at ${x}% ${y}%, rgba(185, 69, 204, ${scrollOpacity}), rgba(53, 91, 224, ${scrollOpacity}))`
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [opacity, scrollOpacity])

  return (
    <div
      className="BackgroundGradientEffect pointer-events-none h-[100vh] fixed inset-0 mx-0 max-w-none rotate-180 overflow-hidden"
      style={{ zIndex }}
    >
      <div className="absolute left-1/3 top-0 ml-[-30rem] h-[30rem] w-[120rem] [mask-image:linear-gradient(white,transparent)]">
        <div
          ref={gradientRef}
          className="absolute inset-0 bg-gradient-to-r"
          style={{
            backgroundImage: `radial-gradient(farthest-side_at_top, ${color}, transparent)`,
          }}
        ></div>
      </div>
    </div>
  )
}
